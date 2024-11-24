import IAgent from "./IAgent";

export default interface IWebAgent extends IAgent {
  start(): Promise<void>;
  stop(): Promise<void>;
}
