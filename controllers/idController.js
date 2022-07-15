exports.getIdUser = (req, res) => {
  const id = req.session?.user.id;
  res.json({ id });
};
