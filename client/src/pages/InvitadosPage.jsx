import React from 'react'
import {useAuth} from '../context/Auth.Context'

export default function InvitadosPage() {
  const {user, logout} = useAuth();
  console.log (user)
  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirige al usuario a la página de login
  };
  return (
    <div>            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
    Cerrar Sesión
  </button></div>
  )
}
