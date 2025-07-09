import foodModel from "../models/foodModel.js";
import fs from 'fs'


// add food item

const addFood = async (req, res) => {
  
  // Check if file was uploaded
  if (!req.file) {
    return res.json({ success: false, message: "No image file uploaded" });
  }

  let image_filname = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filname
  })
  try {
    await food.save();
    res.json({ success: true, message: "Food Added" })
  } catch (error) {
    console.log(error)
    // If database save fails, clean up the uploaded file
    if (req.file && req.file.filename) {
      fs.unlink(`uploads/${req.file.filename}`, (err) => {
        if (err) console.log("Error deleting file:", err);
      });
    }
    res.json({ success: false, message: "Error adding food item" })
  }

}

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

// remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => { });
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}



export { addFood, listFood, removeFood }