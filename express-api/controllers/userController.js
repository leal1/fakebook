const mongoose = require('mongoose');
const userService  = require('../user-service');
const csrf = require('csurf');




exports.xrsfToken = function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken(), { path: '/', httpOnly: false });
  res.status(200).json({test: req.csrfToken()});
}

exports.authenticate = function(req, res, next) {
  userService.authenticate(req.body)
    .then(userResponse => {
      if(userResponse) {
        const { token, ...userWithoutHash } = userResponse;
        res.cookie('token', token, { httpOnly: true }, { secure: true });
        res.status(200).json({userWithoutHash});
      }
      else {
        res.status(400).json({ message: 'Username or password is incorrect' });
      }
    })
    .catch(err => next(err));
}

exports.register = function(req, res, next) {
  userService.create(req.body)
    .then(() => res.status(201).json({}))
    .catch(err => next(err));
}

exports.currentUser = function(req, res, next) {
  userService.getById(req.user.sub)
  .then(user => user ? res.json(user) : res.sendStatus(404))
  .catch(err => next(err));
}

// exports.getById() = function(req, res, next) {
//   userService.getById(req.params.id)
//       .then(user => user ? res.json(user) : res.sendStatus(404))
//       .catch(err => next(err));
// }
