import ILogger from "./ILogger";

export default class Logger implements ILogger {
  log(message: string): void {
    console.log(message);
  }

  error(message: string): void {
    console.error(message);
  }
}
