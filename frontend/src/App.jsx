import LoginForm from './components/LoginForm/LoginForm'
import RegisterForm from './components/RegisterForm/RegisterForm'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ChatBot from './components/Chatbot/Chatbox'
import Courses from './components/Courses/Courses'

const App = () => (
    <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/chatbot' element={<ProtectedRoute><ChatBot /></ProtectedRoute>} />
        <Route path='/courses' element={<ProtectedRoute><Courses /></ProtectedRoute>} />
    </Routes>
)

export default App
