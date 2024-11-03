import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: { type: String },
  userName: { type: String, required: true },
  isSeller: { type: Boolean, required: true },
  hotelName: { 
    type: String, 
    required: function() { return this.isSeller; } 
  },
  hotelAddress: { 
    type: String, 
    required: function() { return this.isSeller; } 
  },
  hotelContactNumber: { 
    type: String, 
    required: function() { return this.isSeller; } 
  },
  hotelImg: { 
    type: String, 
    required: function() { return this.isSeller; } 
  }
});

export const Users = mongoose.model('User', userSchema);
