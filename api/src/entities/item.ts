import {
  Entity,
  Unique,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "items" })
@Unique("idx_items_order", ["order"])
export class Item {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unsigned: true })
  order: number;

  @Column({ length: 80 })
  content: string;

  @Column({ name: "is_done", default: false })
  isDone: boolean;

  @Column({ length: 10, default: "medium" })
  priority: string;

  @CreateDateColumn({ name: "created_at" })
  readonly createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  readonly updatedAt: Date;

  constructor(id: string, order: number, content: string, isDone: boolean, priority: string = "medium") {
    this.id = id;
    this.order = order;
    this.content = content;
    this.isDone = isDone;
    this.priority = priority;
  }
}
