/*module.exports = function(req, res, next) {
  if (req.user) return next();
    res.redirect('/auth/login');

};*/



module.exports = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/auth/login');
};

