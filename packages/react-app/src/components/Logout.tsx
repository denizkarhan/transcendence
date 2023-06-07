<<<<<<< HEAD
import {Container} from 'react-bootstrap';

export default function Logout() {
    return (
    <Container>
        <h1>This is the Logout Page!</h1>
    </Container>
    );
=======
import React from "react"
import { useSignOut } from 'react-auth-kit'

export default function LogOut() {
  const signOut = useSignOut()

  return (signOut());
>>>>>>> main
}