import { ProductEntity } from "@domain/entities/Product";
import { CategoryEnum } from "../../domain/enum/ProductEnum";
import { Decimal } from "@prisma/client/runtime/library";

export const product : ProductEntity =
{
    name: "Batata com queijo",
    description: "Batata",
    stock: 88,
    category: CategoryEnum.BURGUER,
    id: 0,
    price: new Decimal(10)
}