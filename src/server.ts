import dotenv from 'dotenv';
import setupApp from './main/config/app';
import AwsSQS from './infra/aws/sqs.consumer';

dotenv.config();

const PORT = parseInt(`${process.env.PORT || 3000}`);


async function startSQSConsumer() {
  const sqsConsumer = new AwsSQS();

  try {
    await sqsConsumer.consumeFromQueue();
  } catch (error) {
    console.error('Failed to consume from SQS:', error);
  }
}
setInterval(startSQSConsumer, 1000);

const app = setupApp();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
