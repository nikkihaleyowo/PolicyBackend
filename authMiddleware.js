const {auth} = require('express-oauth2-jwt-bearer')

const jwtCheck = auth({
  audience: 'https://dev-r738q3fzlrmjbat5.us.auth0.com/api/v2/',
  issuerBaseURL: 'dev-r738q3fzlrmjbat5.us.auth0.com',
  tokenSigningAlg: 'RS256'
})

module.exports = jwtCheck;