import { UseCase } from '../UseCase';

export interface DeleteProductInterface extends UseCase<DeleteProductInterface.Request, DeleteProductInterface.Response> {
  execute(userId: DeleteProductInterface.Request): Promise<DeleteProductInterface.Response>;
}

export namespace DeleteProductInterface {
  export type Request = number;
  export type Response = void;
}
