import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  foodDescription: { type: String, required: true },
  foodImage: { type: String, required: true }, 
  foodPrice: { type: Number, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
});

export const Food = mongoose.model('Food', foodSchema);
