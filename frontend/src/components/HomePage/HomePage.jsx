import { useState, useEffect, useRef } from "react"
import Navbar from "../Navbar/Navbar"
import UserMsg from "../UserMsg/UserMsg"
import Cookies from "js-cookie"
import AiMsg from "../AiMsg/AiMsg"

const HomePage = () => {
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
            <Navbar />
            <div className="p-4 flex flex-col items-center gap-5">
                <h1 className="font-serif text-2xl font-bold text-black">ASK AI</h1>
                <ul className="  flex flex-col h-[550px] bg-gray-100 w-[800px] rounded p-4 overflow-y-auto space-y-3 scrollbar-hide">
                    {messages.map(eachItem =>
                        eachItem.type === "user"
                            ? <UserMsg key={eachItem.id} values={eachItem} />
                            : <AiMsg key={eachItem.id} values={eachItem} />
                    )}
                    <div ref={messagesEndRef} />
                </ul>
                <form onSubmit={onAdd} className="space-x-4">
                    <input type="text" placeholder="enter your ideas" className="shadow w-[500px] p-2 text-black outline-none rounded bg-gray-200" value={msg} onChange={e => setMsg(e.target.value)} />
                    <button type="submit" className="bg-blue-500 text-white w-20 h-10 rounded text-[20px]">send</button>
                </form>
            </div>

        </>
    )
}
export default HomePage