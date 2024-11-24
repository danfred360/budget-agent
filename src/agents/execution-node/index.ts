import ExecutionNode from "./ExecutionNode";
import Commander from "../../common/services/commander/Commander";
import CommandExecutor from "../../common/services/commander/CommandExecutor";
import Logger from "../../common/services/Logger";

const logger = new Logger();
const commandExecutor = new CommandExecutor();
const commander = new Commander(commandExecutor);

const executeAgent = new ExecutionNode(commander, logger);
console.log("foo bar");
executeAgent.start();
