import mongoose, { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt';

const userSchema = new Schema({
   fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
   },
   username: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
      index: true,
   },
   email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      trim: true,
   },
   password: {
      type: String,
      required: true,
   },
   statistics: {
      type: Schema.Types.ObjectId,
      ref: 'Statistics',
   },
   avatar: {
      type: String, // cloudinary link
   },
   accessToken: {
      type: String,
   },
   refreshToken: {
      type: String,
   }
}, {
   timestamps: true,
})

// userSchema.methods.isPasswordCorrect = async function(password){
//    return await bcrypt.compare(password, this.password);
// }


const User = model("User", userSchema);
export default User;
