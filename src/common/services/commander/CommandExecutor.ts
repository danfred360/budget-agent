import ICommandExecutor, { ExecutionOptions, ExecutionResult } from "./ICommandExecutor";
import { exec } from "child_process";

export default class CommandExecutor implements ICommandExecutor {
  async execute(options: ExecutionOptions): Promise<ExecutionResult> {
    return new Promise((resolve, reject) => {
      exec(`${options.command} ${options.args.join(" ")}`, (error, stdout, stderr) => {
        if (error) {
          if (options.throwOnError) {
            reject(error);
          } else {
            resolve({
              status: error.code || 1,
              stdOut: stdout,
              stdErr: stderr,
            });
          }
        } else {
          resolve({
            status: 0,
            stdOut: stdout,
            stdErr: stderr,
          });
        }
      });
    });
  }
}
