import prisma from "../../db/dbConnect.js";
import {ApiError} from "../../utils/api-error.js";
import {APiResponse} from "../../utils/api-response.js";
import {asyncHandler} from "../../utils/asyncHandler.js";
import bcrypt from "bcrypt";

export const createUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {email},
  });

  if (existingUser) {
    throw new ApiError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return res
    .status(201)
    .json(new APiResponse(201, user, "User created successfully"));
});
