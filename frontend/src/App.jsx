import LoginForm from './components/LoginForm/LoginForm'
import RegisterForm from './components/RegisterForm/RegisterForm'
import { Routes,Route } from 'react-router-dom'

const App = () => (
<Routes>
    <Route path='/login' element={<LoginForm/>}/>
    <Route path='/register' element={<RegisterForm/>}/>
</Routes>
)

export default App
