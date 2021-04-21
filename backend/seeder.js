import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import posts from './data/posts.js'
import orders from './data/orders.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import Post from './models/postModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    // delete everything from models
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Post.deleteMany()
    //  import users from users.js in user modle
    const createdUsers = await User.insertMany(users)

    // admin - first item in users.js
    const adminUser = createdUsers[0]._id

    // add admin user to each product
    const sampleProducts = products.map((product) => {
      //return an Object wich has everthing that product has and an additional field user: adminUser
      return { ...product, user: adminUser }
    })
    // in Product model insert all products with field admin user
    const samplePosts = posts.map((post) => {
      return { ...post, user: adminUser }
    })

    const sampleOrders = orders.map((order) => {
      return { ...order, user: adminUser }
    })
    await Product.insertMany(sampleProducts)
    await Post.insertMany(samplePosts)
    await Order.insertMany(sampleOrders)
    console.log('Data Imported'.green.inverse)
    process.exit() // exit from process
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // delete everything from models
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Post.deleteMany()

    console.log('Data Destroyed'.red.inverse)
    process.exit() // exit from process
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
