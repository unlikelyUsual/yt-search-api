import { cron } from "@elysiajs/cron";
import Sentry from "../config/sentry.config";
import videoModel, { type IVideo } from "../models/video.model";
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
        after: "",
        results: Constants.DEFAULT.LIMIT,
      };
      const resp = await googleService.youtubeVideos(params);

      if (!resp) {
        logger.error(`Invalid response from api`, resp);
        return;
      }

      //@ts-ignore
      const videos: IVideo[] = resp.items.map((item) => ({
        videoId: item.id.videoId,
        channelId: item.snippet.channelId,
        channelTitle: item.snippet.channelTitle,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnails: item.snippet.thumbnails,
        publishedOn: new Date(item.snippet.publishedAt),
      }));

      const insertMany = await videoModel.insertMany(videos);

      logger.log(`insert Many : `, insertMany);
    } catch (err) {
      logger.error(err);
      Sentry.captureException(err);
    }
  },
});
