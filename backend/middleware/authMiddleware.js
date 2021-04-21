import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  // to make sure thet it starts with bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    //console.log('token found');
    // split('')[1] //Bearer token // bearer - index 0 , token - index 1
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      //console.log(decoded);
      //{ id: '5fe3c2322c0197127be01d3e', iat: 1609175963, exp: 1611767963 } => we can use decoded.id, to find a user id
      req.user = await User.findById(decoded.id).select('-password')

      // middleware => next
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Nicht eingelogt, token failed')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Nicht eingelogt, es gibt kein token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Nicht eingelogt als Admin')
  }
}

export { protect, admin }
