import WebAgent from "../../common/infra/WebAgent";
import { Request, Response } from "express";
import ICommander from "../../common/services/commander/ICommander";
import ILogger from "../../common/services/Logger";

export default class ExecutionNode extends WebAgent {
  private commander: ICommander;

  constructor(commander: ICommander, logger: ILogger) {
    super(logger, 4000);
    this.commander = commander;
  }

  protected registerRoutes(): void {
    this.registerFunction("/execute", this.executeHandler.bind(this));
  }

  private async executeHandler(req: Request, res: Response): Promise<void> {
    try {
      const { command, args, approved } = req.body;

      if (!command || !Array.isArray(args)) {
        res.status(400).send({ error: "Invalid command or args." });
        return;
      }

      const result = await this.commander.runCommand({ command, args, approved: !!approved }, true);

      res.status(200).send(result);
    } catch (error) {
      this.log(`Error executing command: ${error}`);
      res.status(500).send({ error: "Failed to execute command." });
    }
  }
}
