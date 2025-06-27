import mongoose from 'mongoose';

let connected = false;

const connectdb = async () => {
    mongoose.set('strictQuery',true);
    if(connected){
        console.log('already connected');
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI);
         connected=true;
        console.log('connected to database');
    }
    catch(err){
        console.log(err);
    }
}
export default connectdb;