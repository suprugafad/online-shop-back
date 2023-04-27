import { secret } from '../config/secrets';
import { UserRepositoryImpl } from '../repositories/userRepositoryImpl';
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
import { JwtPayload } from 'jsonwebtoken';
const userRepository = new UserRepositoryImpl();

const authMiddleware = async (req: any, res: any, next: any) => {
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
      if (err instanceof jwt.TokenExpiredError) {
        const decoded = jwt.decode(token) as JwtPayload;
        const userResult = await userRepository.getByIdWithPassword(decoded.id);

        if (!userResult) {
          return res.status(401).send('User not found');
        }

        const newToken = jwt.sign({ id: decoded.id }, secret, { expiresIn: '1d' });
        res.cookie('token', newToken, { httpOnly: true, sameSite: 'none' });

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
}

async function getUserFromToken(decoded: JwtPayload) {
  const userResult = await userRepository.getByIdWithPassword(decoded.id);

  if (!userResult) {
    throw new Error('User not found');
  }

  return userResult.userDTO;
}

export default [
  cookieParser(),
  authMiddleware
];
