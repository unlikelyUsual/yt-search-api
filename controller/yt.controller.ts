import { t, type Context } from "elysia";
import Video from "../models/video.model";
import BaseController from "./baseController";

export default class YtController extends BaseController {
  constructor() {
    super(YtController.name);
  }

  private async handleTest(context: Context) {
    const { set, query } = context;
    try {
      const { search, limit = 50 } = query;
      const results = query
        ? await Video.find({
            $text: {
              $caseSensitive: false,
              $search: query.search as string,
            },
            score: { $meta: "textScore" },
          })
            .sort({ score: { $meta: "textScore" } })
            .limit(Number(limit))
        : await Video.find({}, {}).sort({ publishedOn: -1 });

      return { data: results };
    } catch (error) {
      return this.returnError(set, error);
    }
  }

  public routes() {
    return this.app.get("/test", this.handleTest.bind(this), {
      query: t.Object({
        search: t.Optional(t.String()),
      }),
    });
  }
}
