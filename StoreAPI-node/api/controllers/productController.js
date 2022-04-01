const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  // throw new Error('testing async errors')
  const products = await Product.find({
    featured: true,
  });
  return res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObj = {};
  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }

  const products = await Product.find(queryObj);
  return res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
