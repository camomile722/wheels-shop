import asyncHandler from 'express-async-handler'

import Product from '../models/productModel.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8

  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc Fetch a single product
// @route GET /api/products/:id
// @access Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Produkt existiert nicht')
  }
})

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  // if product exists remove it from database
  if (product) {
    await product.remove()
    res.json({ message: 'Artikel wurde entfernt' })
  } else {
    res.status(404)
    throw new Error('Produkt existiert nicht')
  }
})
// @desc Create a product
// @route POST /api/products
// @access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.png',
    brand: 'Marke',
    category: 'Kategorie',
    countInStock: 0,
    numReviews: 0,
    description: 'Beschreibung',
  })
  // save new product in database
  const createdProduct = await product.save()
  // 201 - smth was created
  res.status(201).json(createdProduct)
})

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  // details from body
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Produkt existiert nicht')
  }
})

// @desc Create new review
// @route POST /api/products/:id/reviews
// @access Private

const createProductReview = asyncHandler(async (req, res) => {
  // details from body
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)
  if (product) {
    // if we have this product, we check if user has already made a review
    // find a review form this user
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Produkt wurde shon bewertet')
    }
    /// review object
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    // add a new review  to array
    product.reviews.push(review)
    // update number of revies
    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    // save in database
    await product.save()
    // was created
    res.status(201).json({ message: 'Bewertung wurde hinzugefügt' })
  } else {
    res.status(404)
    throw new Error('Produkt existiert nicht')
  }
})

// @desc Get 3 top rated products
// @route GET /api/products/top
// @access Public

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
}) 

export {
  getProducts,
  getProductById,
  getTopProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
}
