import Counter from "@/models/Counter";

export async function generateOrderId() {
  const counter = await Counter.findOneAndUpdate(
    { name: "orderId" },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  return counter.value; // 1, 2, 3...
}
