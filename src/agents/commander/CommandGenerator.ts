import ICommandGenerator, { CommandGeneratorOptions } from "./ICommandGenerator";
import { Command } from "../../common/services/commander/ICommander";
import IOpenAIClient from "../../common/clients/IOpenAIClient";
import { z } from "zod";

export default class CommandGenerator implements ICommandGenerator {
  private readonly openAIClient: IOpenAIClient;

  constructor(openAIClient: IOpenAIClient) {
    this.openAIClient = openAIClient;
  }
  async generateCommand(options: CommandGeneratorOptions): Promise<Command> {
    const systemPrompt = "You are a command generator that generates a bash command based on a goal.";
    const userPrompt = options.goal;

    const commandSchema = z.object({
      command: z.string(),
      args: z
        .array(z.string())
        .transform((args) =>
          args
            .flatMap((arg) => arg.split(",").map((item) => item.trim()))
            .map((arg) => arg.replace(/'/g, ""))
            .filter((arg) => arg.length > 0),
        )
        .refine((args) => args.every((arg) => !arg.includes(",")), {
          message: "Arguments must not contain commas.",
        }),
    });

    const { command, args } = await this.openAIClient.generateJsonResponse(systemPrompt, userPrompt, commandSchema);

    return {
      command,
      args,
      approved: false,
    };
  }
}
