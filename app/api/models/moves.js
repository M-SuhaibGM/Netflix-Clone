import mongoose from "mongoose";

const MovieS = mongoose.Schema({
    title: String,
    thumbnail: String,
    url: String,
    description: String,
});
export const Movie = mongoose.models.Move || mongoose.model('Move', MovieS);