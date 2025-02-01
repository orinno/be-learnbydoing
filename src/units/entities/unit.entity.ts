import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('masterUnit')
export class Unit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn({type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp", default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
    
    @DeleteDateColumn({type: "timestamp", nullable: true})
    deletedAt: Date;
}
