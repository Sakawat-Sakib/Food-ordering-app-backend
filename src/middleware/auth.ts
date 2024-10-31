
import {Request, Response, NextFunction} from 'express'
import { auth } from 'express-oauth2-jwt-bearer';
import jwt from 'jsonwebtoken';
import User from '../models/user'

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auht0Id: string;
    }
  }
}

//This function is mainly used for get Bearer Token and check authenticity is Token generated by Auth0 or not
export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
  });

//mainly get auht0Id and UserId
export const jwtParse = async(req: Request, res: Response, next: NextFunction):Promise<any> => {
  const {authorization} = req.headers

  if(!authorization || !authorization.startsWith("Bearer ")){
    return res.sendStatus(401)
  }
  const token = authorization.split(" ")[1]

  try {
    const decode = jwt.decode(token) as jwt.JwtPayload
    const auth0Id = decode.sub 

    const user = await User.findOne({auth0Id})
    if(!user){
      return res.sendStatus(401)
    }

    req.auht0Id = auth0Id as string
    req.userId = user._id.toString()

    next()

  } catch (error) {
    return res.sendStatus(401)
  }
}