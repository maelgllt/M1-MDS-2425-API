# M1-MDS-2425-API - TP HackR - Maël GUILLOTEAU

## Technologies

- Node.js / Express
- JWT (Json Web Token) : pour l'authentification
- BDD : MySQL
- Swagger : pour la documentation

## Architecture

- /register: routes pour l'inscription
- /login: routes pour la connexion
- /tools/email-check: Vérification de l'existence d'une adresse mail.
- /tools/spammer: Envoi de spamms.
- /tools/password-check: Vérifier si un mot de passe fait partie des plus courants.
- /tools/domain-info: Récupérer les sous-domaines d'un NDD.
- /tools/ddos : simule une attaque ddos
- /tools/random-image : changement d'image random
- /tools/generate-password: Générateur de mot de passe sécurisé.
- /tools/generate-identity: Générer des identités fictives.
- /admin: Pour la gestion des logs et les droits.

## Infos
### Installation de l'Api