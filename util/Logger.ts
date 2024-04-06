import Sentry from "../config/sentry.config";
import { consoleColors } from "./enums";

export default class Logger {
  private nameSpace: string;

  constructor(nameSpace: string) {
    this.nameSpace = nameSpace;
  }

  public success(...optionalParams: any[]): void {
    console.log(
      consoleColors.bg.green,
      `${this.nameSpace}: `,
      ...optionalParams
    );
  }

  public log(...optionalParams: any[]): void {
    Sentry.captureException(optionalParams);
    console.debug(
      consoleColors.bg.white,
      `${this.nameSpace}: `,
      ...optionalParams
    );
  }

  public info(...optionalParams: any[]): void {
    console.info(
      consoleColors.bg.blue,
      `${this.nameSpace}: `,
      ...optionalParams
    );
  }

  public warn(...optionalParams: any[]): void {
    console.warn(
      consoleColors.bg.yellow,
      `${this.nameSpace}: `,
      ...optionalParams
    );
  }

  public error(...optionalParams: any[]): void {
    console.error(
      consoleColors.bg.red,
      `${this.nameSpace}: `,
      ...optionalParams
    );
  }
}
