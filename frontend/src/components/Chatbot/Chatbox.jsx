import { useState, useEffect, useRef } from "react"
import UserMsg from "../UserMsg/UserMsg"
import Cookies from "js-cookie"
import AiMsg from "../AiMsg/AiMsg"
import Navbar from "../Navbar/Navbar"

const ChatBot = () => {
    const [messages, setMessages] = useState([])
    const [msg, setMsg] = useState('')
    const messagesEndRef = useRef(null);

    const onAdd = async e => {
        e.preventDefault()
        const jwt = Cookies.get('jwt_token')

        const newMsg = {
            id: crypto.randomUUID(),
            msg: msg,
            type: "user"
        }
        setMsg('')
        setMessages(prev => [...prev, newMsg])

        const url = "http://localhost:5000/ai/ask"
        const options = {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${jwt}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: msg
            })
        }
        const responce = await fetch(url, options)
        const data = await responce.json()

        const aiMsg = {
            id: crypto.randomUUID(),
            msg: data.reply,
            type: "ai"
        }
        setMessages(prev => [...prev, aiMsg])
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
                <Navbar />
                <div className="flex flex-col items-center justify-center px-4 py-6 shadow">

                    {/* Chat Container */}
                    <div className="w-full md:max-w-3xl bg-white shadow-xl rounded-xl flex flex-col">

                        {/* Header */}
                        <div className="bg-blue-600 text-white text-center py-4 rounded-t-xl">
                            <h1 className="text-2xl font-semibold">AI Assistant</h1>
                            <p className="text-sm text-blue-100">
                                Ask anything and get instant response
                            </p>
                        </div>
                        {/* Messages Area */}
                        <ul className="flex flex-col h-[500px] p-4 overflow-y-auto space-y-3 bg-gray-50 scrollbar-hide">

                            {messages.length === 0 && (
                                <div className="text-center text-gray-400 mt-10">
                                    Start conversation with AI...
                                </div>
                            )}

                            {messages.map(eachItem =>
                                eachItem.type === "user"
                                    ? <UserMsg key={eachItem.id} values={eachItem} />
                                    : <AiMsg key={eachItem.id} values={eachItem} />
                            )}

                            <div ref={messagesEndRef} />

                        </ul>

                        {/* Input Area */}
                        <form
                            onSubmit={onAdd}
                            className="flex items-center gap-3 p-4 border-t bg-white rounded-b-xl"
                        >

                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="flex-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                                value={msg}
                                onChange={e => setMsg(e.target.value)}
                            />

                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatBot