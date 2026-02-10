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
            res.status(201)
            res.json({ message: "User Created Successfully" })
        } else {
            res.status(400)
            res.json({ error: "User already exists" })
        }
    } catch (err) {
        res.status(500)
        res.json({ error: err.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const users =await sql`select * from users where email=${email}`
        const user = users[0]
        if (users.length === 0) {
            res.status(400)
            res.json({ error: "Invalid User" })
        } else {
            const isPassword = await bcrypt.compare(password, user.password)
            if (isPassword) {
                const payload = { id: user.id, username: user.name }
                const jWtToken = jwt.sign(payload, process.env.JWT_SECRET)
                res.send({ jWtToken })
            } else {
                res.status(400)
                res.json({ error: "Invalid password" })
            }
        }

    } catch (error) {
        res.status(500)
        res.json({ error: err.message })
    }

}