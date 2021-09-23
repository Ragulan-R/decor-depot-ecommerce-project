import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
// will remove later
// import { useUserContext } from '../context/user_context'

// rest operator - gathering exact path checkout
// redirects user to home page if they try to manually type checkout in the address bar
const PrivateRoute = ({ children, ...rest }) => {
  // console.log(children)
  // console.log(rest)
  // const { myUser } = useUserContext()
  const { user } = useAuth0()

  // spread operator
  return (
    <Route
      {...rest}
      render={() => {
        return user ? children : <Redirect to='/'></Redirect>
      }}
    ></Route>
  )
}
export default PrivateRoute
