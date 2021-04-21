import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    // cyan.underline - for colors js
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold) // red color for errors from colors
    process.exit(1) // 1 - exit with failuire
  }
}

export default connectDB
