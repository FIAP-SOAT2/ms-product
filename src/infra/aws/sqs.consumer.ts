import { ProductRepository } from '../database/repositories/ProductRepository';
import { UpdateProductInterface } from '../../application/interfaces/use-cases/product/UpdateProductInterface';
import { UpdateProduct } from '../../application/use-cases/product/UpdateProduct';
import AWS from 'aws-sdk';

const defaultRegion = process.env.AWS_REGION || 'us-east-1';
const queueUrl = process.env.ORDER_STOCK_QUEUE;

export default class AwsSQS {
  private sqs: AWS.SQS;

  constructor(
    private readonly updateOrder?: UpdateProduct,
    region?: string,
  ) {
    const options: AWS.SQS.ClientConfiguration = {
      region: region || defaultRegion,
    };
    const productRepostory = new ProductRepository();
    this.sqs = new AWS.SQS(options);
    this.updateOrder = new UpdateProduct(productRepostory, productRepostory);
  }

  async deleteMessage(receiptHandle) {
    const deleteParams = {
      QueueUrl: queueUrl,
      ReceiptHandle: receiptHandle,
    };
    await this.sqs.deleteMessage(deleteParams).promise();
  }

  public async consumeFromQueue(): Promise<any> {
    try {
      const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 5,
      };
      const data = await this.sqs.receiveMessage(params).promise();
      if (data.Messages.length === 0) {
        console.log('No message');
        return;
      }
      const consumeData = JSON.parse(JSON.parse(data.Messages[0].Body).Message);
      console.log('consumeData', consumeData);

      await consumeData.map(async (order) => {
        const updateObject = {
          productId: order.productId,
          productData: {
            stock: order.quantity,
          },
        };
        await this.updateOrder.execute(updateObject, 'stock_reserved');
      });
      await this.deleteMessage(data.Messages[0].ReceiptHandle);
      return data;
    } catch (error) {
      console.log('error', error);
    }
  }
}
