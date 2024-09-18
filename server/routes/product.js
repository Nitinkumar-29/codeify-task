const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const authModel = require("../models/Auth");
const Category = require("../models/Category");
const Product = require("../models/Product");
const fetchUser = require("../middleware/fetchUser");
const upload = require("../utils/upload");

// create a product
router.post(
  "/addProduct",
  upload.array("files", 5),
  [
    body("name", "Enter a valid product name").isString(),
    body("productCategory", "Enter a valid product category").isString(),
  ],
  fetchUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId = req.user.id;
      const { name, productCategory } = req.body;
      const mediaUrls = req.files ? req.files.map((file) => file.path) : [];
      // Check if the user exists
      const user = await authModel.findById(userId);
      if (!user) {
        return res.status(403).json("Unauthorized access blocked");
      }

      // Check if the category exists
      const category = await Category.findOne({ name: productCategory });
      if (!category) {
        return res.status(404).json("Select a valid product category");
      }

      // Check if the product already exists
      let product = await Product.findOne({ name });
      if (product) {
        return res.status(400).json("Product already exists");
      }

      product = await Product.create({
        name,
        productCategory,
        user: userId,
        media: mediaUrls,
      });

      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  }
);

// fetch all products
router.get("/fetchProducts", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    // check for user authentication
    const user = await authModel.findById(userId);
    if (!user) {
      return res.status(403).json("Unauthorized access blocked");
    }
    const products = await Product.find({ user: user._id });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
});

// get product by id
router.get("/fetchProduct/:id", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    const user = await authModel.findById(userId);
    if (!user) {
      return res.status(403).json("unauthorized access");
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json("product not found");
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
});

// edit a product
router.put("/editProduct/:id", [
  body("name", "Enter product name").isString(),
  body("productCategory", "Enter product category").isString(),
  fetchUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId = req.user.id;
      const productId = req.params.id;
      const { name, productCategory } = req.body;

      //   check for user
      const user = await authModel.findById(userId);
      if (!user) {
        return res.status(403).json("unauthorized access forbidden");
      }
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json("product not found");
      }

      //   check for product author
      if (product.user.toString() !== userId) {
        return res
          .status(403)
          .json("cannot update product, unauthorized access");
      }

      product.name = name || product.name;
      product.productCategory = productCategory || product.productCategory;
      product.edited = true;

      await product.save();
      res.status(200).json({ success: true, product });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },
]);

// delete a product
router.delete("/deleteProduct/:id", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    // check auhorization
    const user = await authModel.findById(userId);
    if (!user) {
      return res.status(403).json("Unauthorized access permission denied");
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json("product doesn't exist");
    }

    if (product.user.toString() !== userId) {
      return res.status(403).json("Unauthorized access blocked");
    }
    await product.deleteOne();
    res.status(200).json({ success: true, message: "product deleted" });
  } catch (error) {}
});

module.exports = router;
