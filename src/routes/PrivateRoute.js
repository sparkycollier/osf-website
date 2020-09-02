import React, { useState, useEffect } from "react"
import { connect } from 'react-redux'
import { navigate } from "gatsby"

import envVariables from '../utils/envVariables';
import isAuthorizedUser from '../utils/authorizedGroups';
import { getUserProfile } from "../actions/user-actions";
import { doLogin } from 'openstack-uicore-foundation/lib/methods'
import HeroComponent from '../components/HeroComponent'
import { OPSessionChecker } from "openstack-uicore-foundation/lib/components";

const PrivateRoute = ({ component: Component, isLoggedIn, location, user: { loading, userProfile }, getUserProfile, ...rest }) => {

  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    if (userProfile === null || (isAuthorized === false)) {
      getUserProfile();      
    } else if (userProfile !== null) {      
      setIsAuthorized(() => isAuthorizedUser(userProfile.groups));
    }
  }, [userProfile]);

  if (!isLoggedIn && location.pathname !== `/`) {
    doLogin('/a/profile')
    return null
  }

  if (loading && userProfile === null) {
    return (
      <HeroComponent
        title="Checking credentials..."
      />
    )
  }

  if (isAuthorized === false) {
    navigate('/', {
      state: {
        error: 'Not Authz'
      }
    })
    return null
  }

  const clientId = envVariables.OAUTH2_CLIENT_ID;
  const idpBaseUrl = envVariables.IDP_BASE_URL;

  if (isAuthorized === true) {
    return (
      <>
        <OPSessionChecker clientId={clientId} idpBaseUrl={idpBaseUrl} />
        <Component location={location} {...rest} />
      </>
    );
  } else {
    return null;
  }
}


export default connect(null, { getUserProfile })(PrivateRoute)