import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import 'reflect-metadata'

// db model for the product class
@Entity({ name: "product" })
export class productModel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column("varchar")
    name: string | undefined

    @Column("int")
    quantity: number | undefined

}