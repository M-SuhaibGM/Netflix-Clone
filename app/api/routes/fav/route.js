import mongoose from 'mongoose';
import { NextResponse } from 'next/server.js';
import { Movie } from "../../models/moves.js"
import { URL } from 'url';

mongoose.connect('mongodb://localhost:27017/first')
    .then(() => {
        console.log('Connected to MongoDB successfully!');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });


const Moviesc = mongoose.Schema({
    data:String,
    title: String,
    thumbnail: String,
    url: String,
    description: String,
});

const FavoriteMovie = mongoose.models.fMove || mongoose.model('fMove', Moviesc);

const IDS = mongoose.Schema({
    id: {
        type: String,
        unique: true,
    }
});

export  const ids = mongoose.models.ID || mongoose.model('ID', IDS);




export async function DELETE(request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    try {
        const deletedFavoriteMovie = await FavoriteMovie.deleteOne({ data:id });

        if (!deletedFavoriteMovie) {
            return NextResponse.json({ message: 'Favorite movie not found' }, { status: 404 });
        }

        const mov = await FavoriteMovie.find();
        return NextResponse.json(mov);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error deleting favorite movie' }, { status: 500 });
    }


}



export async function PATCH(request) {
    const data = await request.json();
    if (data.id == "") {

        try {
            const mov = await FavoriteMovie.find();
            return NextResponse.json(mov);


        } catch (error) {
            console.error(error);
            return NextResponse.json({ message: 'Error favoriting movie' }, { status: 422 });
        }

    }
    else {
        try {
            const movie = await Movie.findById({ _id: data.id });

            if (!movie) {
                return NextResponse.json({ message: 'Movie not found' }, { status: 404 });
            }
            const favoriteMovie = new FavoriteMovie({
                data:movie._id,
                title: movie.title,
                thumbnail: movie.thumbnail,
                url: movie.url,
                description: movie.description,
            });
            await favoriteMovie.save();

            const mov = await FavoriteMovie.find();
            return NextResponse.json(mov);
        } catch (error) {
            console.error(error);
            return NextResponse.json({ message: 'Error favoriting movie' }, { status: 500 });
        }
    }
}
export async function PUT(request) {
    const data = await request.json();
    if (data.id == "") {

        try {
            const mov = await ids.find();
            return NextResponse.json(mov);


        } catch (error) {
            console.error(error);
            return NextResponse.json({ message: 'Error favoriting movie' }, { status: 422 });
        }

    }
    else {
        try {

            const idss = new ids({
                id: data.id,

            });
            await idss.save();

            const mov = await ids.find();
            return NextResponse.json(mov);
        } catch (error) {
            console.error(error);
            return NextResponse.json({ message: 'Error favoriting movie' }, { status: 500 });
        }
    }
}








