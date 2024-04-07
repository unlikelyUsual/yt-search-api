import type { IYtVideoResponse } from "../types/googleType";
import { BaseService } from "./base.service";

const keys = process.env.YT_KEY?.split(",");

/**
 * Google service
 * All api's related to google will be here
 */
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
  }): Promise<IYtVideoResponse | null> => {
    try {
      const { part, query, type, order, after, results } = params;
      const res = await this.api.get<IYtVideoResponse>("youtube/v3/search", {
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

      return res.data;
    } catch (err) {
      if (
        //@ts-ignore
        err.message ===
        'The request cannot be completed because you have exceeded your <a href="/youtube/v3/getting-started#quota">quota</a>'
      ) {
        this.key = keys?.pop();
      }
      this.logger.error(err);
      return null;
    }
  };
}
