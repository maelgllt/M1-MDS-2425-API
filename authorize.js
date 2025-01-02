const { Role, Permission } = require('./models');

const authorize = (permissionName) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      // Vérifier si l'utilisateur a un rôle
      const role = await Role.findByPk(user.roleId, {
        include: {
          model: Permission,
          where: { name: permissionName },
          through: { attributes: [] },
        },
      });

      if (!role) {
        return res.status(403).json({ error: 'You do not have permission to perform this action.' });
      }

      next();
    } catch (error) {
      console.error('Authorization error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};

module.exports = authorize;