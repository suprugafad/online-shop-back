const authorizationMiddleware = (requiredRole: string) => {
  return async (req: any, res: any, next: any) => {
    if (!req.user || !req.user.role) {
      return res.status(401).send('User role is missing or invalid');
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).send('Forbidden: insufficient permissions');
    }

    next();
  };
};