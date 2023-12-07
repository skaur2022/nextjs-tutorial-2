
/*User Import: It imports the User model, presumably containing the structure and methods related to a user in the application.
connect Import: Imports a function that likely establishes a connection to the database.
bcrypt Import: Brings in the bcryptjs library, a tool for hashing passwords securely.
NextResponse Import: Imports the NextResponse class, probably used for handling HTTP responses in a Next.js application. */
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


/*POST Function: This is an asynchronous function handling a POST request, likely triggered when a user submits a form or data to create a new user account. */
export const POST = async (request) => {
  //Destructuring Request Data: It extracts name, email, and password from the JSON body of the incoming request.
  const { name, email, password } = await request.json();
  //Database Connection: This line initiates a connection to the database. A proper database connection is essential before performing any database operations.
  await connect();
 // Password Hashing: It hashes the incoming user's password using the bcrypt.hash function. The 5 denotes the number of salt rounds used for hashing, increasing the security of the hashed password.
  const hashedPassword = await bcrypt.hash(password, 5);
  //Creating a User Instance: A new instance of the User model is created with the extracted name, email, and the hashed password.
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
/*try Block: Attempts to save the new user to the database.
await newUser.save(): This might be a method provided by an ORM (Object-Relational Mapping) library or database adapter used to save the newUser instance to the database.
return new NextResponse(...): If the user creation is successful, it returns a success message with a status code of 201. If an error occurs during the save operation, it returns an error message with a status code of 500, indicating a server error. */
  try {
    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};