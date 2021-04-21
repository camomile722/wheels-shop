import React from 'react'
import { Alert } from 'react-bootstrap'

function Message({ variant, children }) {
  // variant - color and children - message
  return <Alert variant={variant}>{children}</Alert>
}
// blue color by default
Message.defaultProps = {
  variant: 'info',
}

export default Message
