import { accessTokens, genrateAccessToken, verifyJWTToken } from "../services/auth.user.service.js";

export const verifyAuth = async(req, res, next) => {
  const token = req.cookies.token;
  const accessToken=req.cookies.access_token;
// console.log(accessToken);

  req.user = null;
   res.locals.userInfo = null;

  if(!token && !accessToken){
       // Optional for views
    return next();
  }

  if(token){
    try {
    const decodedToken = verifyJWTToken(token);
    req.user = decodedToken;              // For use in backend routes
    res.locals.userInfo = decodedToken;   // For use in EJS views

    return next();
    // console.log("req.user", req.user);
  } catch (error) {
    req.user = null;
    res.locals.userInfo = null;
    console.log("JWT verification error:", error.message);
  }
  }

  if(accessToken){
    try {
      const data= await accessTokens(accessToken);
      // console.log(data.user.name);
      // console.log(data.accessToken.id);
      
   const token=genrateAccessToken(
        {
        name:data.user.name,
         email:data.user.email,
         id:data.user.id,
         sessionId:data.accessToken.id
        }
      )

       req.user = {
        name: data.user.name,
        email: data.user.email,
        id: data.user.id,
        sessionId: data.accessToken.id,
      };
      res.locals.userInfo = req.user;
// console.log(token);

       const baseConfig={httpOnly:true,secure:true};
      // console.log("iner",data.accessToken);
      
              res.cookie("token",token,{
                ...baseConfig
              });
              res.cookie("access_token",data.accessToken,{
                ...baseConfig,
                 maxAge: 24 * 3600 * 1000
              })
      return next();
      
    } catch (error) {
      console.log("JWT verification error:", error.message);
    }
  }


  return next();
};
