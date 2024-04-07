import { t, type Context } from "elysia";
import Video from "../models/video.model";
import Constants from "../util/constants";
import BaseController from "./baseController";

export default class YtController extends BaseController {
  constructor() {
    super(YtController.name);
  }

  private async searchHandler(context: Context) {
    const { set, query } = context;
    try {
      const { search = "", limit, skip } = query;

      this.logger.log("Filters : ", { skip, limit, search });

      const results = search
        ? await Video.find(
            {
              $text: {
                $caseSensitive: false,
                $search: search as any,
              },
            },
            {
              score: { $meta: "textScore" },
            }
          )
            .sort({ score: { $meta: "textScore" } })
            .limit(Number(limit))
            .skip(Number(skip))
        : await Video.find({})
            .sort({ publishedOn: -1 })
            .limit(Number(limit))
            .skip(Number(skip));

      this.logger.log(skip, limit, search);

      return { data: results };
    } catch (error) {
      return this.returnError(set, error);
    }
  }

  public routes() {
    return this.app.group("api/v1", (app) =>
      app.get("/videos", this.searchHandler.bind(this), {
        query: t.Object({
          search: t.Optional(t.String()),
          limit: t.String({ default: Constants.DEFAULT.LIMIT }),
          skip: t.String({ default: Constants.DEFAULT.SKIP }),
        }),
      })
    );
  }
}
