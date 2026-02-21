import sql from "../db.js"

export const getcourses = async (req, res) => {
    try {
        const listOfCourses = await sql`select * from courses`
        res.status(200).json({ courses: listOfCourses })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}