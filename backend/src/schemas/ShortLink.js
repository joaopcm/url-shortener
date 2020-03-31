import mongoose from 'mongoose';

const ShortLink = new mongoose.Schema(
  {
    original: {
      type: String,
      required: true,
      allowNull: false,
    },
    shortened: {
      type: String,
      required: true,
      allowNull: false,
    },
    amountOfHits: {
      type: Number,
      allowNull: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('ShortLink', ShortLink);
