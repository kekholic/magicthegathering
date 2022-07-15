exports.getIdUser = (req, res) => {
  console.log('INSIDE getIDUSER', req.session);
  const id = req.session?.user.id;
  res.json({ id });
};
