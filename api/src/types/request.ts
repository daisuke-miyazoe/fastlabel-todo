export type ItemCreateParams = {
  content: string;
  isDone: boolean;
  priority?: string;
};

export type ItemUpdateParams = {
  order?: number;
  content?: string;
  isDone?: boolean;
  priority?: string;
};
