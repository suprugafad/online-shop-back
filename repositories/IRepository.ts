export interface IRepository<T> {
  create(entity: Partial<T>, ...any: any[]): Promise<void>;

  getById(id: number): Promise<T | null>;

  getAll(): Promise<T[]>;

  update(entity: Partial<T>): Promise<void>;

  delete(id: number): Promise<void>;
}