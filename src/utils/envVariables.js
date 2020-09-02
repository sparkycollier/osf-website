const envVariables = {
    IDP_BASE_URL: typeof window === 'object' ? window.IDP_BASE_URL : process.env.GATSBY_IDP_BASE_URL,
    OAUTH2_CLIENT_ID: typeof window === 'object' ? window.OAUTH2_CLIENT_ID : process.env.GATSBY_OAUTH2_CLIENT_ID,
    API_BASE_URL: typeof window === 'object' ? window.API_BASE_URL : process.env.GATSBY_API_BASE_URL,
    SCOPES: typeof window === 'object' ? window.SCOPES : process.env.GATSBY_SCOPES,
};

export default envVariables;