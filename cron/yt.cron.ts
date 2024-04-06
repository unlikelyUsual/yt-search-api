import { cron } from "@elysiajs/cron";
import videoModel from "../models/video.model";
import { GoogleService } from "../service/google.service";
import Logger from "../util/Logger";
import Constants from "../util/constants";

const logger = new Logger("Cron");
const googleService = new GoogleService();

export default cron({
  name: "refreshVids",
  pattern: "*/10 * * * * *", //or Patterns.EVERY_10_SECONDS
  async run() {
    logger.log(`Running the cron!`);
    try {
      const params = {
        part: "snippet",
        query: Constants.query,
        type: "video",
        order: "date",
        after: new Date().toISOString(),
        results: Constants.DEFAULT.LIMIT,
      };
      const resp = await googleService.youtubeVideos(params);

      if (!resp) {
        logger.error(`Invalid response from api`, resp);
        return;
      }

      const insertMany = await videoModel.insertMany(
        resp.items.map((item) => ({
          videoId: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          channelId: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
          publishedOn: new Date(item.snippet.publishedAt),
          thumbnails: item.snippet.thumbnails,
        }))
      );

      logger.log(`insert Many : `, insertMany.length);
    } catch (err) {
      logger.error(err);
    }
  },
});
