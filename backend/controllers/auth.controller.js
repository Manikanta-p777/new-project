import bcrypt from "bcrypt"
import sql from "../db.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const users = await sql`select * from users where email=${email}`
        if (users.length === 0) {
            const hashedPassword = await bcrypt.hash(password, 10)
            await sql`insert into users(name,email,password) values(${name},${email},${hashedPassword})`
            return res.status(201).json({ message: "User Created Successfully" });
        } else {
            return res.status(400).json({ error: "User already exists" });
        }
    } catch (err) {
        return res.status(500).json({error:err.message})
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const users = await sql`select * from users where email=${email}`
        const user = users[0]
        if (users.length === 0) {
            return res.status(400).json({error:"Invalid User"})
        } else {
            const isPassword = await bcrypt.compare(password, user.password)
            if (isPassword) {
                const payload = { id: user.id, username: user.name }
                const jWtToken = jwt.sign(payload, process.env.JWT_SECRET)
                res.send({ jWtToken })
            } else {
                return res.status(400).json({error:"Invalid Password"})
            }
        }

    } catch (err) {
        return res.status(500).json({error:err.message})
    }

}