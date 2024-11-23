import CommandExecutor from "./CommandExecutor";
import { ExecutionOptions, ExecutionResult } from "./ICommandExecutor";

jest.mock("child_process", () => ({
  exec: (command: string, callback: (error: Error | null, stdout: string, stderr: string) => void) => {
    if (command === "echo Hello, World!") {
      callback(null, "Hello, World!\n", "");
    } else {
      callback(new Error("Command not found"), "", "Command not found");
    }
  },
}));

it("executes a command", async () => {
  const options: ExecutionOptions = {
    command: "echo",
    args: ["Hello, World!"],
    throwOnError: true,
  };

  const executor = new CommandExecutor();

  const result: ExecutionResult = await executor.execute(options);
  const { status, stdOut, stdErr } = result;

  expect(status).toBe(0);
  expect(stdOut).toBe("Hello, World!\n");
  expect(stdErr).toBe("");
});

it("throws an error if the command fails", async () => {
  const options: ExecutionOptions = {
    command: "notfound",
    args: [],
    throwOnError: true,
  };

  const executor = new CommandExecutor();

  await expect(executor.execute(options)).rejects.toThrow("Command not found");
});
