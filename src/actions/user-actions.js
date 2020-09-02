import {
  getRequest,
  createAction,
  stopLoading,
  startLoading,  
} from 'openstack-uicore-foundation/lib/methods';

import { customErrorHandler } from '../utils/customErrorHandler';

export const GET_USER_PROFILE       = 'GET_USER_PROFILE';
export const REQUEST_USER_PROFILE   = 'REQUEST_USER_PROFILE';
export const START_LOADING_PROFILE  = 'START_LOADING_PROFILE';
export const STOP_LOADING_PROFILE   = 'STOP_LOADING_PROFILE';

export const getUserProfile = () => (dispatch, getState) => {

  let { loggedUserState: { accessToken } } = getState();

  if (!accessToken) return Promise.resolve();

  let params = {
      access_token : accessToken,      
      expand: 'groups'
  };

  return getRequest(
      createAction(START_LOADING_PROFILE),
      createAction(GET_USER_PROFILE),
      `${window.API_BASE_URL}/api/v1/members/me`,
      customErrorHandler
  )(params)(dispatch).then(() => dispatch(dispatch(createAction(STOP_LOADING_PROFILE))));
};
