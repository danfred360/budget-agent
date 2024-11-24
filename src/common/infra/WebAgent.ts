import express, { Request, Response, Router, Application } from "express";
import axios from "axios";
import ILogger from "../services/ILogger";

type RegisteredFunction = {
  path: string;
  handler: (req: Request, res: Response) => void;
};

type RemoteAgent = {
  name: string;
  url: string;
};

export default abstract class WebAgent {
  private logger: ILogger;

  private app = express();

  private router = Router();

  private readonly port: number;

  private functions: RegisteredFunction[] = [];

  private remoteAgents: RemoteAgent[] = [];

  constructor(logger: ILogger, port: number = 3000) {
    this.logger = logger;
    this.port = port;
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

  protected getRegisteredFunctions(): RegisteredFunction[] {
    return this.functions;
  }

  protected registerRemoteAgent(name: string, url: string): void {
    this.logger.log(`Registering remote agent "${name}" at ${url}`);
    this.remoteAgents.push({ name, url });
  }

  private registerDiscoveryRoutes(): void {
    this.router.get("/functions", (req, res) => {
      res.json({ functions: this.functions.map((fn) => fn.path) });
    });

    this.router.get("/remote-agents", (req, res) => {
      res.json({ agents: this.remoteAgents.map((agent) => agent.name) });
    });
  }

  log(message: string): void {
    this.logger.log(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  getPort(): number {
    return this.port;
  }

  protected async callRemoteAgent(agentName: string, endpoint: string, data: object): Promise<object> {
    const agent = this.remoteAgents.find((a) => a.name === agentName);

    if (!agent) {
      throw new Error(`Remote agent "${agentName}" is not registered.`);
    }

    const url = `${agent.url}${endpoint}`;
    this.logger.log(`Calling remote agent at ${url}`);

    const response = await axios.post(url, data);
    return response.data;
  }

  protected getApp(): Application {
    return this.app;
  }

  async start(): Promise<void> {
    this.app.listen(this.port, () => {
      this.logger.log(`Agent started on port ${this.port}`);
    });
  }
}
