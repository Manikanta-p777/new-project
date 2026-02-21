import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import Navbar from "../Navbar/Navbar"
import EachCourse from "../EachCourse/EachCourse"

const Courses = () => {
    const [courses, setCourses] = useState([])
    const [isloading, setLoading] = useState(true)

    const getCourses = async () => {
        try {
            const jwt = Cookies.get("jwt_token")
            const url = "http://localhost:5000/api/courses"
            const options = {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                }
            }
            const response = await fetch(url, options)
            if (response.ok) {
                const data = await response.json()
                setCourses(data.courses)
                setLoading(false)
            } else {
                console.error("Failed to fetch courses:", response.status)
            }
        } catch (error) {
            console.error("Error fetching courses:", error)
        }
    }

    useEffect(() => {
        getCourses()
    }, [])


    return (
        <>
            <Navbar />
            {isloading && <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="w-12 h-12 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin"></div>
            </div>}
            <div className="bg-slate-900 min-h-screen px-4 sm:px-8 lg:px-16 py-10 flex flex-wrap justify-center gap-6">
                {courses.map(eachItem => (
                    <EachCourse key={eachItem.id} courseDetails={eachItem} />
                ))}
            </div>
        </>
    )
}

export default Courses