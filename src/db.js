import mongoose, { connect } from 'mongoose';

export const connectDB = async () => { 
    try {
        await mongoose.connect("mongodb+srv://luis:77807205Luis@swfotos.hcgp7k3.mongodb.net/?retryWrites=true&w=majority");
        console.log("DB is connects");
    } catch (error) {
        console.log(error);
    }
};
