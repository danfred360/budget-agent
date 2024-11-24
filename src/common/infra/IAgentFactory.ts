import IAgent from "./IAgent";

export default interface IAgentFactory {
  createAgent(options: CreateAgentOptions): Promise<IAgent>;
}

export type CreateAgentOptions = {
  interfaceMode: InterfaceMode;
};

export type InterfaceMode = "cli" | "web";
