import { Link, Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"
import Cookies from "js-cookie"

const LoginForm = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [isError, setError] = useState(false)

    const onChangeEmail = event => {
        setEmail(event.target.value)
    }

    const onChangePassword = event => {
        setPassword(event.target.value)
    }

    const onLoginUser = async event => {
        event.preventDefault()

        const usersCredentials = { email, password }

        const api = "http://localhost:5000/auth/login"

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usersCredentials)
        }

        try {
            const response = await fetch(api, options)
            const data = await response.json()

            if (response.ok) {
                setError(false)
                setErrorMsg('')
                setEmail('')
                setPassword('')

                const jwtToken = data.jWtToken
                Cookies.set('jwt_token', jwtToken, { expires: 20 })

                navigate("/", { replace: true })
            } else {
                setError(true)
                setErrorMsg(data.error)
            }
        } catch (error) {
            setError(true)
            setErrorMsg("Something went wrong")
        }
    }

    const jwt = Cookies.get('jwt_token')
    if (jwt !== undefined) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen p-4 flex flex-col md:flex-row items-center justify-center gap-8 w-full">

            {/* Illustration - small on mobile, full on md+ */}
            <div className="flex w-full justify-center md:w-1/2">
                <img
                    src="https://stories.freepiklabs.com/storage/54320/computer-login-rafiki-8960.png"
                    alt="Login Illustration"
                    className="w-48 sm:w-64 md:w-full max-w-md"
                />
            </div>

            {/* Card - full width on mobile, scales up on larger screens */}
            <form
                onSubmit={onLoginUser}
                className="transition-transform duration-300 ease-out hover:-translate-y-2
                           w-full sm:w-3/4 md:w-2/5 lg:w-1/3 xl:w-1/4
                           rounded-lg shadow-xl p-6 bg-white bg-opacity-90 flex flex-col space-y-3"
            >
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-center">
                    Login
                </h1>

                <label className="font-serif">Email</label>
                <input
                    type="email"
                    required
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={onChangeEmail}
                    className="outline-none text-black h-10 w-full shadow p-3 rounded bg-gray-100 border-0 focus:ring-2 focus:ring-blue-500"
                />

                <label className="font-serif">Password</label>
                <input
                    type="password"
                    required
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={onChangePassword}
                    className="outline-none text-black h-10 w-full shadow p-3 rounded bg-gray-100 border-0 focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="transition-transform duration-150 ease-out active:scale-95 h-10 w-20 self-center rounded mt-5 bg-blue-600 hover:bg-blue-800 text-white"
                >
                    Login
                </button>

                <p className="font-serif text-left">
                    Not registered yet
                    <span className="underline ml-2 text-blue-500">
                        <Link to="/register">Sign-Up</Link>
                    </span>
                </p>

                {isError && (
                    <p className="font-semibold text-red-600 text-center">
                        {errorMsg}
                    </p>
                )}
            </form>
        </div>
    )
}

export default LoginForm