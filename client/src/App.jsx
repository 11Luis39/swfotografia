import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContext, AuthProvider } from './context/Auth.Context'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import EventosPage from './pages/EventosPage'
import FotografosPage from './pages/FotografosPage'
import InvitadosPage from './pages/InvitadosPage'
import ProtectedRoute from './ProtectedRoute'
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1> home page </h1>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/eventos' element={<EventosPage />} />
            <Route path='/fotografos' element={<FotografosPage />} />
            <Route path='/invitados' element={<InvitadosPage />} />
          </Route>



        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
