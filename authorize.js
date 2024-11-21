const { Role, Permission } = require('./models'); // Assurez-vous d'importer les modèles correctement

const authorize = (permissionName) => {
  return async (req, res, next) => {
    try {
      // Récupérer l'utilisateur authentifié
      const user = req.user; // Assurez-vous que l'utilisateur est stocké dans `req.user` après l'authentification

      // Vérifier si l'utilisateur a un rôle
      const role = await Role.findByPk(user.roleId, {
        include: {
          model: Permission,
          where: { name: permissionName },
          through: { attributes: [] }, // Nous n'avons pas besoin de charger les données de la table pivot
        },
      });

      // Si le rôle n'a pas la permission, envoyer une erreur
      if (!role) {
        return res.status(403).json({ error: 'You do not have permission to perform this action.' });
      }

      next(); // Autoriser l'accès à la route si l'utilisateur a la permission
    } catch (error) {
      console.error('Authorization error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};

module.exports = authorize;