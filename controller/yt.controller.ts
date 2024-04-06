import axios from "axios";
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
      const userSchema = Video.find({});
      const res = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: process.env.YT_KEY,
            part: "snippet",
            q: "football",
            type: "video",
            order: "date",
            // publishedAfter: date.toISOString(),
            maxResults: 50,
          },
        }
      );

      return { data: res.data };
    } catch (error) {
      return this.returnError(set, error);
    }
  }

  public routes() {
    return this.app.get("/test", this.handleTest.bind(this), {
      params: t.Object({
        search: t.Optional(t.String()),
      }),
    });
  }
}
