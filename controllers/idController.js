exports.getIdUser = (req, res) => {
  const id = req.session?.user;
  res.json({ id });
};
