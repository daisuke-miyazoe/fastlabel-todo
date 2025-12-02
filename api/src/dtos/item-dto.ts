import { ItemVO } from "../types/vo";
import { Item } from "../entities/item";

export class ItemDto {
  id: string;
  order: number;
  content: string;
  isDone: boolean;
  priority: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, order: number, content: string, isDone: boolean, priority: string = "medium") {
    this.id = id;
    this.order = order;
    this.content = content;
    this.isDone = isDone;
    this.priority = priority;
  }

  toEntity = (): Item => {
    const entity = new Item(this.id, this.order, this.content, this.isDone, this.priority);
    entity.id = this.id;
    entity.order = this.order;
    entity.content = this.content;
    entity.isDone = this.isDone;
    entity.priority = this.priority;
    return entity;
  };

  static fromEntity = (entity: Item): ItemDto => {
    const dto = new ItemDto(
      entity.id,
      entity.order,
      entity.content,
      entity.isDone,
      entity.priority
    );
    return dto;
  };

  toVO = (): ItemVO => {
    return {
      id: this.id,
      order: this.order,
      content: this.content,
      isDone: this.isDone,
      priority: this.priority,
    };
  };
}
