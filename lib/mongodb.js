import mongoose from "mongoose"

export const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connection MongoDB Successed")
    }catch(error){
        console.log("Error to Connecting MongoDB :",error)
    }
}