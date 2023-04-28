import {secret} from '../config/secrets';
import {UserRepositoryImpl} from '../repositories/userRepositoryImpl';

const jwt = require('jsonwebtoken')
import {JwtPayload} from 'jsonwebtoken';

const userRepository = new UserRepositoryImpl();

const authenticationMiddleware = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send('Authorization token is missing or invalid');
    }

    try {
      const decoded = jwt.verify(token, secret) as JwtPayload;
      req.user = await getUserFromToken(decoded);
      next();
    } catch (err) {
      console.error(err);
      if (err instanceof jwt.TokenExpiredError) {
        const decoded = jwt.decode(token) as JwtPayload;
        console.log("error", decoded.role);
        const userResult = await userRepository.getByIdWithPassword(decoded.id);

        if (!userResult) {
          return res.status(401).send('User not found');
        }

        const newToken = jwt.sign({id: decoded.id, role: decoded.role}, secret, {expiresIn: '1d'});
        res.cookie('token', newToken, {httpOnly: true, sameSite: 'none'});

        req.user = userResult.userDTO;
        next();
      } else {
        console.error(err);
        return res.status(401).send('Authorization token is missing or invalid');
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(401).send('Authorization token is missing or invalid');
  }
};

async function getUserFromToken(decoded: JwtPayload) {
  const userResult = await userRepository.getByIdWithPassword(decoded.id);

  if (!userResult) {
    throw new Error('User not found');
  }

  return userResult.userDTO;
}

export default authenticationMiddleware;