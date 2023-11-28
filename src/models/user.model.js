import mongoose, { mongo } from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },  
    password: {
        type: String,
        require: true,
    },
    roles: [{
        ref: "Role",
        type: mongoose.Schema.Types.ObjectId
    }],
    profilePictures: [String]
},
{
    timestamps: true
});

export default mongoose.model('User', userSchema);
