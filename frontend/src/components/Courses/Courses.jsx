import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import Navbar from "../Navbar/Navbar"
import EachCourse from "../EachCourse/EachCourse"

const Courses = () => {
    const [courses, setCourses] = useState([])
    const [isloading, setLoading] = useState(true)
    const [searchIp, setSearchIp] = useState('')

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

    const updatedCourses = courses.filter(eachItem => eachItem.title.toLowerCase().includes(searchIp.toLocaleLowerCase()))
    
    return (
        <>
            <Navbar />
            {isloading && <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="w-12 h-12 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin"></div>
            </div>}
            <div className="bg-slate-900 flex justify-center px-4 py-4">
                <input type="search" placeholder="Search courses..." value={searchIp} onChange={e => setSearchIp(e.target.value)} className="text-sm w-full max-w-md h-10 outline-none border-solid bg-slate-200 rounded-lg px-2 text-slate-900 placeholder-slate-400" />
            </div>
            <div className="bg-slate-900 min-h-screen px-4 sm:px-8 lg:px-16 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 place-items-center">
                {updatedCourses.map(eachItem => (
                    <EachCourse key={eachItem.id} courseDetails={eachItem} />
                ))}
            {updatedCourses.length===0 && <h1 className="col-span-full text-2xl text-white font-semibold">No courses found</h1>}
            </div>
        </>
    )
}

export default Courses