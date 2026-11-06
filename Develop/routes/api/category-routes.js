const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
      },]
  })
   .then(categoryData => res.json(categoryData))
   .catch(err => {
     console.log(err);
     res.status(500).json(err);
   })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
      },
    ]
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: "No Category found with that ID" });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update category name by its `id` value
  Category.update(req.body, 
    {
    where: {
      id: req.params.id,
    },
    }
  )
  .then((categoryData) => {
    if (!categoryData[0]) {
      res.status(404).json({ message: "No Category found with that ID "});
      return;
    }
    res.json(categoryData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
    Category.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedCategory) => {
        if (!deletedCategory) {
          res.status(404).json({ message: "No Category found with that ID" });
          return;
        }
        res.json(deletedCategory);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;