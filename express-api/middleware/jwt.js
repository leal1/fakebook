const userService = require('../user-service');
const expressJwt = require('express-jwt');

module.exports = jwt;
function jwt() {
  const secret = process.env.JWT_SECRET;
  return expressJwt({secret, isRevoked,  
    getToken: function fromCookie (req) {
    if (req.cookies && req.cookies.hasOwnProperty('token')) {
        return req.cookies.token;
    }
    return null;
    } })
  .unless({
    path: [
      '/users/authenticate',
      '/users/register',
      '/users/login'
    ]
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);
  // revoke
  if(!user) {
    return done(null, true);
  }
  done();
}