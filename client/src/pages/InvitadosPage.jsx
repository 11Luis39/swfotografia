import React from 'react'
import {useAuth} from '../context/Auth.Context'

export default function InvitadosPage() {
  const {user} = useAuth();
  console.log (user)
  return (
    <div>InvitadosPage</div>
  )
}
