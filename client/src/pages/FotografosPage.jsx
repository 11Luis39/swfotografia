import React from 'react'
import {useAuth} from '../context/Auth.Context'

export default function FotografosPages() {

    const {user} = useAuth();
    console.log (user)
  return (
    <div>FotografosPages</div>
  )
}
