import Navbar from "../Navbar/Navbar"

const AboutPage = () => (
    <>
    <Navbar/>
    <div className="flex flex-col justify-center items-center min-h-screen p-3 gap-2 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <h1 className="text-white text-3xl font-sans font-bold">This is Ai powered course viewer application</h1>
        <p className="text-gray-400 font-3xl font-mono">Explore all the courses</p>
    </div>
    </>
)

export default AboutPage