# M1-MDS-2425-API - TP HackR - Maël GUILLOTEAU

## Technologies

- Node.js / Express
- JWT (Json Web Token) : pour l'authentification
- Swagger : pour la documentation

## Architecture

- /auth: Routes pour l'authentification (connexion, inscription, gestion des tokens JWT).
- /tools: différentes fonctionnalités d'outils de hacking.
  - /tools/email-check: Vérification de l'existence d'une adresse mail.
  - /tools/spammer: Envoi de spamms.
  - /tools/password-check: Vérifier si un mot de passe fait partie des plus courants.
  - /tools/domain-info: Récupérer les sous-domaines d'un NDD.
  - /tools/ddos
  - /tools/password-generator: Générateur de mot de passe sécurisé.
  - /tools/identity-generator: Générer des identités fictives.
- /admin: Pour la gestion des logs et les droits.
