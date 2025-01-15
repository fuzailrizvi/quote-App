const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
      next();
      
      
    } catch (error) {
      console.log(error);
      res.status(401).json({
        success: false,
        message: "Unauthorized, Please Login First",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "No Token, Unauthorized",
    });
  }
};

module.exports={
    isAuthenticated
}