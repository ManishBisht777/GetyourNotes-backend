var jwt = require("jsonwebtoken");
const JWT_SECRET = "manishBisht";

const fetchuser = async (req, res, next) => {
  //get user form jwt token and add id to request object

  const token = await req.header("auth-token");
  if (!token) {
    res.status(401).send("please authnticate using valid token");
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send("please authnticate using valid token");
  }
};

module.exports = fetchuser;
