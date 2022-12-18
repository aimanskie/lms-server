import mongoose from 'mongoose'
const { Schema } = mongoose
const { ObjectId } = Schema

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
    token: String,
  },
  { timestamps: true }
)

// userSchema.pre('save', async function (next) {
//   const id = setTimeout(async function () {
//     const document = await this.findOne(this.token)
//     await document.remove()
//   }, 120000)
//   this.timerId = id
//   console.log(this)
//   const document = await this.findOne(this.token)
//   clearTimeout(document.id)
//   next()
// })

const User = mongoose.model('User', userSchema)
export default User
