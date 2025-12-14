import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateToken } from "../utils/jwt";
import { registerSchema } from "../utils/validator";
export const register = async (req: any, res: any) => {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashed,
        role: role === "ADMIN" ? "ADMIN" : "USER"
    });

    res.status(201).json({ message: "User registered" });
};


export const login = async (req: any, res: any) => {
    console.log("BODY:", req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ id: user._id, role: user.role });
    res.json({ token, role: user.role });
};
