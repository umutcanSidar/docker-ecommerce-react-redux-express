import mongoose from "mongoose";
import User from "./user.model";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  paymentStatus: {
    type: Boolean,
    required: true,
  },
  billingAddress: {
    type: String,
    required: true,
  },
  billingCountry: {
    type: String,
    required: true,
  },
  billingCity: {
    type: String,
    required: true,
  },
  billingZipCode: {
    type: String,
    required: true,
  },
  billingContactName: {
    type: String,
    required: true,
  },
  basketItems: [{ type: Array, required: true }],
  ip: {
    type: String,
    required: true,
  },
  installment: { type: Number, required: true },
  created_date: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Orders", OrderSchema);
