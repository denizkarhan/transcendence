import React from "react"
import { useSignOut } from 'react-auth-kit'

export default function LogOut() {
  const signOut = useSignOut()

  return (signOut());
}