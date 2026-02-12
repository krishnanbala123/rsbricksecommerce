// import mongoose from "mongoose";

// const OrderSchema = new mongoose.Schema(
//   {
//     orderId: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     name: {
//       type: String,
//       required: true,
//     },

//     phone: {
//       type: String,
//       required: true,
//     },

//     deliveryAddress: {
//       type: String,
//       required: true,
//     },

//     location: {
//       lat: Number,
//       lng: Number,
//     },

//     type: {
//       type: String,
//       required: true,
//     },

//     noOfBricks: {
//       type: Number,
//       required: true,
//       min: 2000,
//     },

//     brickRate: {
//       type: Number,
//       required: true,
//     },

//     totalAmount: {
//       type: Number,
//       required: true,
//     },

//     paidAmount: {
//       type: Number,
//       default: 0,
//     },

//     remainingAmount: {
//       type: Number,
//       default: 0,
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["pending", "completed"],
//       default: "pending",
//     },

//     verified: {
//       type: Boolean,
//       default: false,
//     },
// // 
//     movedToHistory: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Order ||
//   mongoose.model("Order", OrderSchema);


import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  productId: String,
  type: String,
  quantity: Number,
  rate: Number,
  total: Number,
});

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    name: { type: String, required: true },
    phone: { type: String, required: true },
    deliveryAddress: { type: String, required: true },

    location: {
      lat: Number,
      lng: Number,
    },

    items: {
      type: [ItemSchema],
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paidAmount: { type: Number, default: 0 },
    remainingAmount: { type: Number, default: 0 },

    paymentStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    verified: { type: Boolean, default: false },
    movedToHistory: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
