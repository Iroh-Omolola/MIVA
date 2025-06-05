import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';


/**
 * @description Handles register requests by checking the user's credentials.
 * * Ensure the email and password are required and the email is valid. 
 * Also validates the password to accept minimum of 6 characters
 * On successful register, returns a success message. Otherwise, returns appropriate error messages.
 * @route POST /api/register
 * @param {NextRequest} req - The  request object containing the register data (email, password) in JSON format.
 * @returns {NextResponse} The response object, used to send back the register result
 */


export async function POST(request: NextRequest) {
  let users = [];
  try {
const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /.{6,}/;

     users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 401 });
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Email is invalid' }, { status: 401 });
    }
    if (!passwordRegex.test(password)) {
      return NextResponse.json({ message: 'Password must be at least 6 characters long' }, { status: 401 });
    }

    const existingUser = users.find((user: { email: string }) => user.email === email);
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    users.push({ email, password });
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch {
   
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


