import { Document, Schema, model } from "mongoose";

export interface IVideo extends Document {
  videoId: string;
  title: string;
  description: string;
  channelId: string;
  channelTitle: string;
  publishedAt: Date;
  thumbnails: IThumbnail[];
}

export interface IThumbnail extends Document {
  height: number;
  width: number;
  url: string;
}

const itemSchema = new Schema<IThumbnail>({
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
      required: true,
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
    publishedAt: {
      type: Date,
      required: true,
      index: true, // Create index on this field
    },
    thumbnails: [itemSchema],
  },
  {
    timestamps: true,
  }
);

export default model<IVideo>("videos", schema);
