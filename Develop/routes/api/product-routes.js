const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


// GET all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        { model: Category },
        { model: Tag, through: ProductTag, as: 'product_tags' }
      ]
    });
    res.json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single product by its `id`
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: Tag, through: ProductTag, as: 'product_tags' }
      ]
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST and PUT you already have

// DELETE a product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
