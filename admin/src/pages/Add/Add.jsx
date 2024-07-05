import React from "react";
import "./Add.css";
import { assets } from "../../assets/assets";

const Add = () => {
  return (
    <>
      <div className="add">
        <form className="flex-col">
          <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={assets.upload_area} alt="" />
            </label>
            <input required type="file" id="image" hidden />
          </div>
          <div className="add-product-name flex-col">
            <p>Product Name</p>
            <input required type="text" name="name" placeholder="Type here" />
          </div>
          <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea
              name="description"
              rows="6"
              placeholder="Write content here"
              required></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product category</p>
              <select required name="category">
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Desert">Desert</option>
                <option value="Sandwitch">Sandwitch</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product price</p>
              <input required type="Number" name="price" placeholder="₹" />
            </div>
          </div>
          <button type="submit" className="add-btn">
            ADD
          </button>
        </form>
      </div>
    </>
  );
};

export default Add;
