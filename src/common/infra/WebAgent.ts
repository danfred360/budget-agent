import express, { Request, Response, Router } from "express";
import ILogger from "../services/ILogger";

type RegisteredFunction = {
  path: string;
  handler: (req: Request, res: Response) => void;
};

export default abstract class WebAgent {
  private logger: ILogger;
  private app = express();
  private router = Router();
  private readonly port = 3000;
  private functions: RegisteredFunction[] = [];
  private subAgents: Record<string, WebAgent> = {};

  constructor(logger: ILogger) {
    this.logger = logger;
    this.app.use(express.json());
    this.app.use(this.router);
    this.registerRoutes();
    this.registerDiscoveryRoutes();
  }

  protected abstract registerRoutes(): void;

  protected registerFunction(path: string, handler: (req: Request, res: Response) => void): void {
    this.logger.log(`Registering function at ${path}`);
    this.router.post(path, handler);
    this.functions.push({ path, handler });
  }

  protected registerSubAgent(path: string, subAgent: WebAgent): void {
    this.logger.log(`Registering sub-agent at ${path}`);
    this.subAgents[path] = subAgent;
    this.app.use(path, subAgent.getApp());
  }

  private registerDiscoveryRoutes(): void {
    this.router.get("/functions", (req, res) => {
      res.json({ functions: this.functions.map((fn) => fn.path) });
    });

    this.router.get("/sub-agents", (req, res) => {
      res.json({ agents: Object.keys(this.subAgents) });
    });
  }

  log(message: string): void {
    this.logger.log(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  async start(): Promise<void> {
    this.app.listen(this.port, () => {
      this.logger.log(`Agent started on port ${this.port}`);
    });
  }

  async stop(): Promise<void> {
    this.logger.log("Agent stopped");
  }

  protected getApp(): express.Application {
    return this.app;
  }
}
