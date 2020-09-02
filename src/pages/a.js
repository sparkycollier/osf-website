import React from "react"
import { Router, Location } from "@reach/router"
import { connect } from 'react-redux'
import PrivateRoute from '../routes/PrivateRoute'
import ProfilePage from "../templates/profile-page";

const App = ({ isLoggedUser, user, summit_phase }) => {  
  return (
    <Location>
      {({ location }) => (
        <Router basepath="/a" >
          <PrivateRoute path="/profile"component={ProfilePage} isLoggedIn={isLoggedUser} user={user} location={location} />
        </Router>
      )}
    </Location>
  )
}

const mapStateToProps = ({ loggedUserState, userState }) => ({
  isLoggedUser: loggedUserState.isLoggedUser,
  user: userState
})

export default connect(mapStateToProps)(App)