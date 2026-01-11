import { Request, Response } from "express";
import { loginUser, signupUser } from "../services/auth.service";
import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../../../datasources/data-source";
import { User } from "../../../entities/User";

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, username, password } = req.body;

        const user = await signupUser(email, username, password);

        return res.status(StatusCodes.CREATED).json({
            message: "User registered successfully",
            user,
        });

    } catch (error: any) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message || "Signup failed",
        });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { identifier, password } = req.body;

        const { user, token } = await loginUser(identifier, password);

        return res.status(StatusCodes.OK).json({
            message: "Login succesful",
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username
            },
        });
    } catch (error: any) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: error.message || "Invalid credentials",
        });
    }
};

export const me = async (req: any, res: Response) => {
    try {
        const userRepo = AppDataSource.getRepository(User);

        console.log('req.userId: ', req.userId);
        const user = await userRepo.findOne({
            where: { id: req.userId },
            select: ["id", "username", "email", "created_at"]
        });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found",
            });
        }

        return res.status(StatusCodes.OK).json({
            user,
        });
    } catch {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Failed to fetch user",
        });
    }
}