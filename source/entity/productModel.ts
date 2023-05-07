import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, PrimaryColumn } from "typeorm";
import 'reflect-metadata'

// db model for the product class
@Entity({name: "product"})
export class productModel extends BaseEntity {

    @PrimaryColumn("int")
    id: number | undefined

    @Column("varchar")
    name: String | undefined

    @Column("int")
    quantity: Number | undefined 

}