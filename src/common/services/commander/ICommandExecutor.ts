export default interface ICommander {
  execute(options: ExecutionOptions): Promise<ExecutionResult>;
}

export type ExecutionOptions = {
  command: string;
  args: string[];
  throwOnError: boolean;
};

export type ExecutionResult = {
  status: number;
  stdOut: string;
  stdErr: string;
};
