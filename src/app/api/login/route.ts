
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { UserProps } from "@/type/auth";


/**
 * @description Handles login requests by verifying user credentials stored in a local JSON file.
 * Validates that both email and password are provided, ensures the email format is correct, 
 * and checks that the password meets a minimum length requirement.
 * On successful login, returns a token and success message. Otherwise, returns appropriate error messages.
 * @route POST /api/login
 * @param {NextRequest} req - The request object containing the login data (email, password) in JSON format.
 * @returns {NextResponse} - The response object, used to send back the login result
 */





export async function POST(req: NextRequest) {
  const filePath = path.join(process.cwd(), "src", "data", "users.json");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /.{6,}/;
  const token = `miva-${randomUUID()}`;

  try {
    const users: UserProps[] = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 401 });
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Email is invalid" }, { status: 401 });
    }

    if (!passwordRegex.test(password)) {
      return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 401 });
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", token }, { status: 200 });
  } catch (error) {
    console.log("man-err", error);
    return NextResponse.json({
      message: "Error reading users data",
      error: (error as Error).message,
    }, { status: 500 });
  }
}

