import mongoose from "mongoose";
import Counter from "./Counter.js";

const CartSchema = new mongoose.Schema(
  {
    orderId: {
      type: Number,
      unique: true,
    },
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foods",
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to increment orderId
CartSchema.pre("save", async function (next) {
  if (this.isNew) {
    // Only generate orderId on document creation
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: "orderId" },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );
      this.orderId = counter.sequenceValue;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.model("cart", CartSchema);
