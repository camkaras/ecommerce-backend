const router = require("express").Router();
const {Product, Category, Tag, ProductTag} = require("../../models");

// get all products
router.get("/", async (req, res) => {
	await Product.findAll({
		attributes: ["id", "product_name", "price", "stock", "category_id"],
		include: [
			{
				model: Tag,
				attributes: ["id", "tag_name"],
				through: "ProductTag",
			},
			{
				model: Category,
				attributes: ["id", "category_name"],
			},
		],
	})
		.then((productData) => {
			res.json(productData);
		})
		.catch((err) => {
			res.json(err);
		});
});

// get one product
router.get("/:id", (req, res) => {
	Product.findByPk(req.params.id, {
		include: [
			{
				model: Tag,
				attributes: ["id", "tag_name"],
				through: "ProductTag",
			},
			{
				model: Category,
				attributes: ["id", "category_name"],
			},
		],
	})
		.then((specificProduct) => {
			res.json(specificProduct);
		})
		.catch((err) => {
			res.json(err);
		});
});


module.exports = router;