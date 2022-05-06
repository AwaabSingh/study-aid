import mongoose from 'mongoose';

const connectDB = async() => {
      try {
        const conn = 'mongodb://localhost/studies'
        await mongoose.connect(conn)

        console.log(`MongoDB Running on ${conn}`.cyan.underline)
      } catch (error) {
           console.error(`Error: ${error.message}`.red.underline.bold)
           process.exit(1)
      } 
}

export default connectDB;