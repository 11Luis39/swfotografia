import React from 'react'
import {useAuth} from '../context/Auth.Context'

export default function eventos() {
  const {user} = useAuth();
  console.log (user)
  return (
    <div>eventos</div>
  )
}
