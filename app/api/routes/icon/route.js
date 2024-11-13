import {ids} from '../fav/route.js';
import { NextResponse } from 'next/server.js';

export async function DELETE(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Missing id parameter' }, { status: 400 });
  }

  try {
    const deletedFavoriteMovie = await ids.deleteOne({id});

    if (!deletedFavoriteMovie) {
      return NextResponse.json({ message: 'Favorite movie not found' }, { status: 404 });
    }

    const movies = await ids.find();
    return NextResponse.json(movies);
  } catch (error) {
    console.error(`Error deleting favorite movie with id ${id}:`, error);
    return NextResponse.json({ message: 'Error deleting favorite movie' }, { status: 500 });
  }
}

