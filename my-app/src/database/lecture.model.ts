import { Document, model, models, Schema } from "mongoose";

export interface ILecture extends Document {
  _id: string;
  title: string;
  course: Schema.Types.ObjectId;
  created_at: Date;
  _destroy: boolean;
  lessons: Schema.Types.ObjectId[];
  order: number;
}

const lectureSchema = new Schema<ILecture>({
  title: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  _destroy: {
    type: Boolean,
    default: false,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  lessons: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
  order: {
    type: Number,
    default: 0,
  },
});

const Lecture = models.Lecture || model<ILecture>("Lecture", lectureSchema);
export default Lecture;
