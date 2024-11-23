import { Command } from "../../common/services/commander/ICommander";

export default interface ICommandGenerator {
  generateCommand(options: CommandGeneratorOptions): Promise<Command>;
}

export type CommandGeneratorOptions = {
  goal: string;
};
