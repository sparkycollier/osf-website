import React from 'react'
import { connect } from 'react-redux'
import { navigate } from "gatsby"

import Layout from '../components/Layout'
import envVariables from '../utils/envVariables'

export const ProfilePageTemplate = ({ loggedUserState, location }) => {
    if (loggedUserState.isLoggedUser) {
      return (<div>Profile Page</div>)
    }

    return (
        <React.Fragment>
            <div>Profile Page 2</div>
        </React.Fragment>
    )
}

const ProfilePage = ({ loggedUserState, location }) => {
    return (
        <Layout>
            <ProfilePageTemplate
                loggedUserState={loggedUserState}
                location={location}
            />
        </Layout>
    )
}

export default connect(state => ({
    loggedUserState: state.loggedUserState
}), null)(ProfilePage)