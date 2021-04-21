import asyncHandler from 'express-async-handler'

import Order from '../models/orderModel.js'

// @desc Create new order
// @route Post /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {
  // without tax.price
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('Bestellung ist leer')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    })
    // save in database
    const createdOrder = await order.save()
    // 201- smth was created
    res.status(201).json(createdOrder)
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Bestellung existiert nicht')
  }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    // saving in database
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Bestellung existiert nicht')
  }
})

// @desc    Get logged in user order
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  // find user width id = logged_in user id
  const orders = await Order.find({
    user: req.user._id,
  })
  res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  //find all orders and  populate - we need a user, that created this order
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    // saving in database
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Bestellung existiert nicht')
  }
})

// @desc Delete an order
// @route DELETE /api/orders/:id
// @access Private/Admin

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  // if order exists remove it from database
  if (order) {
    await order.remove()
    res.json({ message: 'Bestellung wurde entfernt' })
  } else {
    res.status(404)
    throw new Error('Bestellung wurde nicht gefunden')
  }
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  deleteOrder,
}
