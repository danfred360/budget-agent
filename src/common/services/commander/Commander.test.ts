import Commander from "./Commander";
import ICommandExecutor from "./ICommandExecutor";
import { mock } from "jest-mock-extended";

const getMocks = () => {
  const commandExecutor = mock<ICommandExecutor>();
  commandExecutor.execute.mockResolvedValue({
    status: 0,
    stdOut: "",
    stdErr: "",
  });

  return {
    commandExecutor,
  };
};

it("runs an approved command", async () => {
  const { commandExecutor } = getMocks();

  const command = {
    command: "echo",
    args: ["Hello, World!"],
    approved: true,
  };

  const commander = new Commander(commandExecutor);

  await commander.runCommand(command);

  expect(commandExecutor.execute).toHaveBeenCalledTimes(1);
});

it("throws an error if the command is not approved", async () => {
  const { commandExecutor } = getMocks();

  const command = {
    command: "echo",
    args: ["Hello, World!"],
    approved: false,
  };

  const commander = new Commander(commandExecutor);

  await expect(commander.runCommand(command)).rejects.toThrow("Command not approved");
});

it("runs an unapproved command when verification is disabled", async () => {
  const { commandExecutor } = getMocks();

  const command = {
    command: "echo",
    args: ["Hello, World!"],
    approved: false,
  };

  const commander = new Commander(commandExecutor);

  await commander.runCommand(command, false);

  expect(commandExecutor.execute).toHaveBeenCalledTimes(1);
});
