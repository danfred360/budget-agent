export default interface Commander {
  runCommand(command: Command, verify: boolean): Promise<CommandResult>;
}

export type Command = {
  command: string;
  args: string[];
  approved: boolean;
};

export type CommandResult = {
  status: number;
  stdOut: string;
  stdErr: string;
};
