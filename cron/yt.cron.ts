import type { Context } from "elysia";
import Logger from "../util/Logger";

class YtCron {
  private readonly logger = new Logger(YtCron.name);

  refreshVidsCRON = (context: Context) => {};
}
