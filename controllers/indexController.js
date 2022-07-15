exports.redirectHomeController = (req, res) => {
  if (req.session?.user) return res.redirect(`/users/${req.session.user.id}/collections`);
  res.redirect('/home');
};
