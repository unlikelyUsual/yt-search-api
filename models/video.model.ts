import { Document, Schema, model } from "mongoose";

export interface IVideo extends Document {
  videoId: string;
  title: string;
  description: string;
  channelId: string;
  channelTitle: string;
  publishedOn: Date;
  thumbnails: {
    default: IThumbnail;
    medium: IThumbnail;
    high: IThumbnail;
  };
}

export interface IThumbnail extends Document {
  height: number;
  width: number;
  url: string;
}

const thumbnailSchema = new Schema<IThumbnail>({
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const schema = new Schema<IVideo>(
  {
    videoId: {
      type: String,
      required: true,
      unique: true,
      select: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      select: true,
      trim: true,
    },
    description: {
      type: String,
      select: true,
      trim: true,
    },
    channelId: {
      type: String,
      required: true,
      select: true,
      trim: true,
    },
    channelTitle: {
      type: String,
      required: true,
      select: true,
      trim: true,
    },
    publishedOn: {
      type: Date,
      required: true,
      index: true,
    },
    thumbnails: {
      default: thumbnailSchema,
      medium: thumbnailSchema,
      high: thumbnailSchema,
    },
  },
  {
    timestamps: true,
  }
);

//text index on text fields
schema.index({
  title: "text",
  description: "text",
});

export default model<IVideo>("videos", schema);
