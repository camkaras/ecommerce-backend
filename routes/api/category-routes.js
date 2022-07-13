const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  await Category.findAll({
    attributes: ["id", "category_name"],
    include: [{
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"]
    }]
  })
  .then((categories) => {
    res.json(categories);
  })

});

router.get('/:id', async (req, res) => {
  await Category.findByPk(req.params.id, {
    attributes: ["id", "category_name"],
		include: [
			
      {
				model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
			
      }
		],
	})
  .then((category) => {
    res.json(category);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.post('/', async (req, res) => {
  await Category.create(req.body)
		.then((newCategory) => res.status(200).json(newCategory))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

module.exports = router;