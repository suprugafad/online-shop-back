import { secret } from '../config/secrets';
import { UserRepositoryImpl } from '../repositories/userRepositoryImpl';

const jwt = require('jsonwebtoken')
const userRepository = new UserRepositoryImpl();

const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send('Authorization token is missing or invalid');
    }

    const decoded = jwt.verify(token, secret);

    const userResult = await userRepository.getByIdWithPassword(decoded.id);

    if (!userResult) {
      return res.status(401).send('User not found');
    }

    req.user = userResult.userDTO;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send('Authorization token is missing or invalid');
  }
}

export default authMiddleware;
