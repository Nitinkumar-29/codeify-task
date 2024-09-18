const expresss = require("express");
const { body, validationResult } = require("express-validator");
const router = expresss.Router();
const fetchUser = require("../middleware/fetchUser");
const authModel = require("../models/Auth");
const Category = require("../models/Category");
const Product = require("../models/Product");

// create a category
router.post(
  "/addCategory",
  [body("name", "Enter category name").isString()],
  fetchUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name } = req.body;
      const userId = req.user.id; // Assuming user is added by fetchUser middleware

      // Check if category already exists
      let category = await Category.findOne({ name });
      if (category) {
        return res.status(401).json("Category already exists!");
      }

      // Create a new category
      category = new Category({
        user: userId,
        name: name,
      });

      await category.save();
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  }
);

// fetch all categories
router.get("/fetchCategories", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await authModel.findById(userId);
    if (!user) {
      return res.status(403).json("Unauthorized access");
    }

    const categories = await Category.find({ user });
    if (categories.length === 0) {
      return res.status(200).json(" no categories");
    }
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
});

// edit a category
router.put(
  "/editCategory/:id",
  [body("name", "Enter category name")],
  fetchUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId = req.user.id;
      const { name } = req.body;
      const categoryId = req.params.id;

      //   check authorization
      const user = await authModel.findById(userId);
      if (!user) {
        return res.status(403).json("Unauthorized access forbidden");
      }

      //   check for category
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(404).json("Category not found");
      }

      //   check if the category belongs to current user
      if (category.user.toString() !== userId) {
        return res.status(403).json("Not authorized to make changes");
      }

      //   update category
      category.name = name || category.name;

      //   save
      await category.save();
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  }
);

// delete a category
router.delete("/deleteCategory/:id", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const categoryId = req.params.id;

    // check for user
    const user = await authModel.findById(userId);
    if (!user) {
      return res.status(403).json("Unauthorized access blocked");
    }

    // check for category
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json("category not found");
    }

    // check whether the current user is author
    if (category.user.toString() !== userId) {
      return res.status(403).json("unauthorized access blocked");
    }
    // Delete associated products
    await Product.deleteMany({ productCategory: category.name });

    // Delete the category
    await category.deleteOne();
    res.status(200).json("category deleted!");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
});

module.exports = router;
