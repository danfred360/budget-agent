export default interface Commander {
  runCommand(command: Command, verify: boolean): Promise<CommandResult>;
}

export interface Command {
  command: string;
  args: string[];
  approved: boolean;
}

export interface CommandResult {
  status: number;
  stdOut: string;
  stdErr: string;
}
