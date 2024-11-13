import mongoose from 'mongoose';
import { NextResponse } from 'next/server.js';
import { Movie } from "../../models/moves.js"


mongoose.connect('mongodb://localhost:27017/first')
    .then(() => {
        console.log('Connected to MongoDB successfully!');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
export async function GET() {
    try {
        const count = await Movie.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomMovie = await Movie.findOne().skip(randomIndex);
        return  NextResponse.json(randomMovie);
       
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error fetching movie' }, { status: 500 });
    }
}

export async function POST() {
    try {
      const movies = await Movie.find();
      return NextResponse.json(movies);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Error fetching movies' }, { status: 500 });
    }
  }
  
  export async function PUT(request) {
    const data = await request.json();
    try {
      const movie = await Movie.findById({_id:data.id});
      return NextResponse.json(movie);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Error updating movie' }, { status: 500 });
    }
  }

 
  