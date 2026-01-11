import { AppDataSource } from "../../../datasources/data-source"
import { User } from "../../../entities/User"
import * as bcrypt from "bcrypt";
import { generateToken } from "../../../utils/jwt";

export const signupUser = async (
    email: string,
    username: string,
    password: string
) => {

    const userRepo = AppDataSource.getRepository(User);

    // Check if user already exists
    const existingUser = await userRepo.findOne({
        where: [{ email }, { username }],
    });

    if (existingUser) {
        throw new Error("Email or username already exists");
    }

    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = userRepo.create({
        email,
        username,
        password: hashedPassword,
    });

    // Save New User
    await userRepo.save(user);

    return {
        id: user.id,
        email: user.email,
        username: user.username,
    };
};


export const loginUser = async (
    identifier: string,
    password: string
) => {
    const userRepo = AppDataSource.getRepository(User);

    // Find user by email or username
    const user = await userRepo.findOne({
        where: [{ email: identifier }, { username: identifier }]
    });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Incorrect Password");
    }

    // Generate JWT
    const token = generateToken({
        userId: user.id,
    });

    return {
        user,
        token,
    };
};