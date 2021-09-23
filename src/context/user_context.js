import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  // invoke autho0 hook
  // isAuthenticated, isLoading removed from the destructure
  const { loginWithRedirect, logout, user } = useAuth0()

  // state
  const [myUser, setMyUser] = useState(null)

  // to see the values everytime isauthenticated changes
  // check if user exists
  useEffect(() => {
    // console.log(`'user:${user}`)
    // console.log(`'isAuthenticated':${isAuthenticated}`)
    // console.log(`'isLoading':${isLoading}`)
    // if (isAuthenticated) {
    //   setMyUser(user)
    // } else {
    //   setMyUser(false)
    // }

    setMyUser(user)
  }, [user])

  // isAuthenticated

  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
      {children}
    </UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
