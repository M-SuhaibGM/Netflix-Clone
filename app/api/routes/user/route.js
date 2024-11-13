
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { NextResponse } from 'next/server.js';
import users from '../../models/user.js'
import { SuiteContext } from 'node:test';


mongoose.connect('mongodb://localhost:27017/first')
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

export async function POST(request) {
  try {
    const data = await request.json();
    if (!data.email || !data.username || !data.password) {
      return NextResponse.json('Please provide all required fields');
    }

    const existingUser = await users.findOne({ email: data.email });
    if (existingUser) {
      return NextResponse.json('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new users({ ...data, password: hashedPassword });
    await newUser.save();

    return NextResponse.json('User created successfully');
  } catch (error) {
    console.error(error);
    return NextResponse.json('Error creating user');
  }
}

export async function PUT(request) {
  try {
    const data = await request.json();
    if (!data.email || !data.password) {
      return NextResponse.json({message:'Please provide all required fields'});
    }

    const user = await users.findOne({ email: data.email });
    if (!user) {
      return NextResponse.json({message:'User not exsist'});
    }
    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({message:'Invalid  password'});
    }
    return NextResponse.json({user,message:"Logged in successfully"});
  } catch (error) {
    console.error(error);
    return NextResponse.json('Error logging in');
  }

}



