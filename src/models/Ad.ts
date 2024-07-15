import { UploadResponse } from "imagekit/dist/libs/interfaces";
import { Model, Schema, model, models } from "mongoose";

export interface Ad {
  _id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  contact: string;
  files: UploadResponse[];
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

const adSchema = new Schema<Ad>({
  title: String,
  price: Number,
  category: String,
  description: String,
  contact: String,
  files: [Object],
  userEmail: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export const AdModel = (models?.Ad as Model<Ad>) || model<Ad>("Ad", adSchema)