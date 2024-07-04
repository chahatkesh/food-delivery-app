import mongoose from "mongoose";

export const ConnectDB = async () => {
  await mongoose.connect('mongodb+srv://chahat:Chahat1234@cluster0.ggijxpj.mongodb.net/food-delivery-app').then(() => console.log("DB Connected"))
}