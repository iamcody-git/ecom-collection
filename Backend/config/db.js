import mongoose from "mongoose";

const connectDB = async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log('Db connected');
        
    })
    await mongoose.connect(`${process.env.MONGO_URL}/ecom-fever`)

}

export default connectDB;