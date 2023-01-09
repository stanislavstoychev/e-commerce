import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32,
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    }
});
//slug react js -> react-js instead of using uid number!!
export default mongoose.model('Category', categorySchema);

