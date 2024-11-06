import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },
    foodName: {
      type: String,
      required: true,
    },
    foodPrice: {
      type: Number,
      required: true,
    },
    foodImage: {
      type: String,
    },
    users: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        status: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("cart", CartSchema);
