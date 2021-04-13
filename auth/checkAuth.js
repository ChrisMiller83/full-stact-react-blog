function checkAuth(req, res, next) {
  // is user logged in?
  const { user } = req.session;
  // if not, send 401 error
  if (!user) {
    return res.status(401).json({
      error: 'Not logged in'
    });
  } else {
    next();
  }
}

module.exports = checkAuth;