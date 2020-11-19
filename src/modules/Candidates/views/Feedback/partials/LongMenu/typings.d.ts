export interface IOptions {
  type: string;
  path?: string;
  deleteFn?: (id: string) => void;
}
