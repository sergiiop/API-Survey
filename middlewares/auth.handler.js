import { unauthorized } from '@hapi/boom'

import { config } from './../config/config.js'

function checkApiKey(req, res, next) {
  const apiKey = req.headers.api

  if (apiKey === config.apiKey) {
    next()
  } else {
    next(unauthorized())
  }
}

function checkAdminRole(req, res, next) {
  const user = req.user
  if (user.role === 'admin') {
    next()
  } else {
    next(unauthorized())
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user
    if (roles.includes(user.role)) {
      next()
    } else {
      next(unauthorized())
    }
  }
}

export { checkApiKey, checkAdminRole, checkRoles }
