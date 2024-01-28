import { Decimal } from '@prisma/client/runtime/library';
import { CategoryEnum } from '../../domain/enum/ProductEnum';

export type IProductDomain = {
  id: number;
  name: string;
  description: string;
  category: CategoryEnum | string;
  price: Decimal;
  stock: number;
  created_at?: Date;
  updated_at?: Date;
};

export class ProductEntity implements IProductDomain {
  id: number;
  name: string;
  description: string;
  category: CategoryEnum | string;
  price: Decimal;
  stock: number;
  created_at?: Date;
  updated_at?: Date;

  constructor(props: IProductDomain) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.category = props.category;
    this.price = props.price;
    this.stock = props.stock;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  static create(props: IProductDomain): ProductEntity {
    return new ProductEntity(props);
  }
}
