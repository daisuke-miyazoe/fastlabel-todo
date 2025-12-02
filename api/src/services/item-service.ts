import { getCustomRepository } from "typeorm";
import { ItemDto } from "../dtos/item-dto";
import { provideSingleton } from "../middlewares/inversify/ioc-util";
import { ItemRepository } from "../repositories/item-repository";
import { ItemCreateParams, ItemUpdateParams } from "../types/request";
import { ItemVO } from "../types/vo";
import { v4 as uuid } from "uuid";
import {
  ClientError,
  ClientErrorStatusCodes,
} from "../middlewares/client-error";

@provideSingleton(ItemService)
export class ItemService {
  private itemRepository: ItemRepository;

  constructor() {
    this.itemRepository = getCustomRepository(ItemRepository);
  }

  async get(): Promise<ItemVO[]> {
    const dtos = await this.itemRepository.get();
    return dtos.map((dto) => dto.toVO());
  }

  async find(id: string): Promise<ItemVO> {
    const dto = await this.itemRepository.findByIdOrFail(id);
    return dto.toVO();
  }

  async search(keyword: string): Promise<ItemVO[]> {
    const dtos = await this.itemRepository.search(keyword);
    return dtos.map((d) => d.toVO());
  }

  async create(params: ItemCreateParams): Promise<ItemVO> {
    const currentItem = this.itemRepository;
    if ((await currentItem.count()) >= 10) {
      throw new ClientError(
        ClientErrorStatusCodes.UNPROCESSABLE_ENTITY,
        "Todo count is up to 10."
      );
    }
    const lastItem = await currentItem.findLastByOrder();
    const order = lastItem ? lastItem.order + 1 : 1;
    const priority = params.priority || "medium";
    const newItem = new ItemDto(uuid(), order, params.content, params.isDone, priority);
    await currentItem.save(newItem.toEntity());
    return newItem.toVO();
  }

  async update(id: string, params: ItemUpdateParams): Promise<ItemVO> {
    const dto = await this.itemRepository.findByIdOrFail(id);
    if (params.order !== undefined) dto.order = params.order;
    if (params.content !== undefined) dto.content = params.content;
    if (params.isDone !== undefined) dto.isDone = params.isDone;
    if (params.priority !== undefined) dto.priority = params.priority;
    await this.itemRepository.save(dto);
    return dto.toVO();
  }

  async getByPriority(priority?: string): Promise<ItemVO[]> {
    const dtos = await this.itemRepository.getByPriority(priority);
    return dtos.map((d) => d.toVO());
  }

  async count(): Promise<number> {
    return this.itemRepository.count();
  }

  async delete(id: string): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
