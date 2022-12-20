import type ISubscriber from "./ISubscriber";

export default interface IProvider {
  subscribers: ISubscriber[];
  notifySubscribers(): void;
}
