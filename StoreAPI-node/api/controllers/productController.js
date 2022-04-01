const getAllProductsStatic = async (req, res) => {
  return res.status(200).json({ msg: "Product testing route" });
};

const getAllProducts = async (req, res) => {
  return res.status(200).json({ msg: "Product route" });
};

module.exports = { getAllProducts, getAllProductsStatic };
