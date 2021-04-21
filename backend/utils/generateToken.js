import jwt from 'jsonwebtoken'

// id because we want to add id as a payload in this token
// payload is an 1) Object {id }, 2) secret -  in env add JWT_TO, 3) options
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}
export default generateToken
