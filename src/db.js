import mongoose, { connect } from 'mongoose';

export const connectDB = async () => { 
    try {
        await mongoose.connect("mongodb://localhost/swfoto");
        console.log("DB is connects");
    } catch (error) {
        console.log(error);
    }
};
