import { Link } from "react-router-dom"
import Navbar from "../Navbar/Navbar"

const HomePage = () => (
    <>
        <Navbar />
        <div className="flex flex-col justify-center items-center p-10 min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
            <div className="p-4 space-y-10 flex flex-col max-w-2xl items-center text-center">
                <h1 className="text-white text-5xl font-serif font-bold"> Your Intelligent AI Assistant</h1>
                <p className="text-slate-300 text-lg font-mono"> Ask anything, generate ideas, and boost productivity with our powerful AI assistant.</p>
                <Link to="/chatbot"> <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">Get Started</button></Link>
            </div>
        </div>
    </>
)

export default HomePage