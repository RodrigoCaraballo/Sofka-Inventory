export interface IEventPublisher {
  send<Result = any, Input = any>(pattern: any, data: Input): Promise<Result>;
  emit<Result = any, Input = any>(pattern: any, data: Input): Promise<Result>;
}
