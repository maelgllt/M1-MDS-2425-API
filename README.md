# M1-MDS-2425-API - TP HackR - Maël GUILLOTEAU

## Technologies

- Node.js / Express
- JWT (Json Web Token) : pour l'authentification
- BDD : MySQL
- Swagger : pour la documentation

## Architecture

- /register: routes pour l'inscription
- /login: routes pour la connexion
- /tools: différentes fonctionnalités d'outils de hacking.
  - /tools/email-check: Vérification de l'existence d'une adresse mail.
  - /tools/spammer: Envoi de spamms.
  - /tools/password-check: Vérifier si un mot de passe fait partie des plus courants.
  - /tools/domain-info: Récupérer les sous-domaines d'un NDD.
  - /tools/ddos
  - /tools/random-image : génère 
  - /tools/password-generator: Générateur de mot de passe sécurisé.
  - /tools/identity-generator: Générer des identités fictives.
- /admin: Pour la gestion des logs et les droits.

## Infos
### Register
Inscription avec un email, mot de passe (et roleId).
```json
{
  "email": "admin@gmail.fr",
  "password": "admin",
  "roleId": 1
}
```
Le roleId est optionel car si on ne le met pas, la valeur sera "2".  
roleId : 1 => admin  
roleId : 2 => user  

