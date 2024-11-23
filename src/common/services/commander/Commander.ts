import ICommander, { Command, CommandResult } from "./ICommander";
import ICommandExecutor, { ExecutionOptions, ExecutionResult } from "./ICommandExecutor";

export default class Commander implements ICommander {
  private readonly commandExecutor: ICommandExecutor;

  constructor(commandExecutor: ICommandExecutor) {
    this.commandExecutor = commandExecutor;
  }

  async runCommand(command: Command, verify: boolean = true): Promise<CommandResult> {
    if (verify && !command.approved) {
      throw new Error("Command not approved");
    }

    const executionOptions: ExecutionOptions = {
      command: command.command,
      args: [],
      throwOnError: true,
    };

    const result: ExecutionResult = await this.commandExecutor.execute(executionOptions);
    const { status, stdOut, stdErr } = result;

    return { status, stdOut, stdErr };
  }
}
