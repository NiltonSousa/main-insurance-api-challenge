export interface IController<T, U> {
  control(input: T): Promise<U>;
}
