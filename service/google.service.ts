import Sentry from "../config/sentry.config";
import { BaseService } from "./base.service";

const keys = process.env.YT_KEY?.split(",");

export class GoogleService extends BaseService {
  private key: string | undefined = keys?.pop();

  constructor() {
    super(GoogleService.name);
  }

  youtubeVideos = async (params: {
    part: string;
    query: string;
    type: string;
    order: string;
    after: string;
    results: number;
  }) => {
    try {
      const { part, query, type, order, after, results } = params;
      const res = await this.api.get("youtube/v3/search", {
        params: {
          key: this.key,
          part,
          q: query,
          type,
          order: order,
          publishedAfter: after,
          maxResults: results,
        },
      });

      return res;
    } catch (err) {
      if (
        //@ts-ignore
        err.message ===
        'The request cannot be completed because you have exceeded your <a href="/youtube/v3/getting-started#quota">quota</a>'
      ) {
        this.key = keys?.pop();
      }
      this.logger.error(err);
      Sentry.captureException(err);
      return {};
    }
  };
}
