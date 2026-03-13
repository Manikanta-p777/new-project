import Navbar from "../Navbar/Navbar"

const AboutPage = () => (
    <>
    <Navbar/>
    <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-blue-500 text-4xl font-sans">This is Ai powered course viewer application</h1>
        <p className="text-black font-3xl font-mono">Explore all the courses</p>
    </div>
    </>
)

export default AboutPage