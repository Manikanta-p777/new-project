import LoginForm from './components/LoginForm/LoginForm'
import RegisterForm from './components/RegisterForm/RegisterForm'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage/HomePage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

const App = () => (
    <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
    </Routes>
)

export default App
