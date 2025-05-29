import { verifyJWTToken } from "../services/auth.user.service.js";

export const verifyAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    req.user = null;
    res.locals.userInfo = null; // Optional for views
    return next();
  }

  try {
    const decodedToken = verifyJWTToken(token);
    req.user = decodedToken;              // For use in backend routes
    res.locals.userInfo = decodedToken;   // For use in EJS views
    // console.log("req.user", req.user);
  } catch (error) {
    req.user = null;
    res.locals.userInfo = null;
    console.log("JWT verification error:", error.message);
  }

  return next();
};
