import React from 'react'
import { useAuth } from '../context/Auth.Context'

export default function FotografosPages() {

  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirige al usuario a la página de login
  };
  console.log(user)
  return (
    <div>            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
      Cerrar Sesión
    </button></div>
  )
}
