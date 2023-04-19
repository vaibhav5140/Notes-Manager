const mongoose=require('mongoose');
mongoose.set('strictQuery',false);
const connectDB=async()=>{
    try{
        const connec=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`db is connected:${connec.connection.host}`);
    }
    catch(error){
        console.log(error);
    }
}
module.exports=connectDB;