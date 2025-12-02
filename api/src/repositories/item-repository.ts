import { EntityRepository, Repository, SelectQueryBuilder } from "typeorm";
import { ItemDto } from "../dtos/item-dto";
import { Item } from "../entities/item";

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {

  private getBaseQuery(): SelectQueryBuilder<Item> {
    return this.createQueryBuilder("items");
  }

  async findByIdOrFail(id: string): Promise<ItemDto> {
    const query = this.getBaseQuery().where("items.id = :id", {
      id,
    });
    return ItemDto.fromEntity(await query.getOneOrFail());
  }

  async findLastByOrder(): Promise<ItemDto | undefined> {
    const entity = await this.getBaseQuery()
      .orderBy("items.order", "DESC")
      .getOne();
    if (!entity) return undefined;
    return ItemDto.fromEntity(entity);
  }

  async get(): Promise<ItemDto[]> {
    const entities = await this.getBaseQuery()
      .orderBy("items.order", "ASC")
      .getMany();
    return entities.map((e) => ItemDto.fromEntity(e));
  }

  async search(keyword: string): Promise<ItemDto[]> {
    const results = await this.getBaseQuery()
      .where("items.content LIKE :keyword", { keyword: `%${keyword}%` })
      .orderBy("items.order", "ASC")
      .getMany();
    return results.map((e) => ItemDto.fromEntity(e));
  }

  async getByPriority(priority?: string): Promise<ItemDto[]> {
    const query = this.getBaseQuery();

    if (priority) {
      query.where("items.priority = :priority", { priority });
    }

    // Sort by priority (high -> medium -> low) then by order
    query.addSelect(
      `CASE items.priority
        WHEN 'high' THEN 1
        WHEN 'medium' THEN 2
        WHEN 'low' THEN 3
        ELSE 4
      END`,
      "priority_order"
    )
    .orderBy("priority_order", "ASC")
    .addOrderBy("items.order", "ASC");

    const entities = await query.getMany();
    return entities.map((e) => ItemDto.fromEntity(e));
  }
}
