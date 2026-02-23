const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.redirect('/admin/login');
};

module.exports = { requireAuth };
