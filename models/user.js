import mongoose from 'mongoose'
const { Schema } = mongoose
const { ObjectId } = Schema

// const userVerification = new Schema(
//   {
//     hashedToken: String,
//     otp: number
//   }
// )

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    picture: {
      type: String,
      default: '/avatar.png',
    },
    role: {
      type: [String],
      default: ['Subscriber'],
      enum: ['Subscriber', 'Admin'],
    },
    bankAccount: String,
    bank: String,
    // stripe_account_id: '',
    // stripe_seller: {},
    stripeSession: {},
    passwordResetCode: {
      data: String,
      default: '',
    },
    courses: [{ type: ObjectId, ref: 'Course' }],
    // verified: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)
