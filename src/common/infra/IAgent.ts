export default interface IAgent {
  start(): Promise<void>;
  stop(): Promise<void>;
}
