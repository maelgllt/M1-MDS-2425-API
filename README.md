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
### Register (POST)
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

---

### Login (POST)
Connexion avec un email et un mot de passe
```json
{
  "email": "admin@gmail.fr",
  "password": "admin"
}
```

---

### Email-check (GET)
Vérifie si l'adresse email entrée existe

| Key   | Value                              |
|-------|------------------------------------|
| email | mael.guilloteau@my-digital-school.org |

---

### Spammer (POST)
Outil de spammer d'email
```json
{
  "email": "mael.guilloteau@my-digital-school.org",
  "subject": "Sujet du spam",
  "text": "Contenu du spam",
  "count": 3
}
```

---

### Check password (GET)
Vérifie si le mot de passe entré est sur la liste des plus courants

| Key   | Value                              |
|-------|-----------|
| password | 123456 |

---

### Crawler (GET)
Retourne le maximum d'informations d'une personne entrée en paramètre

| Key   | Value     |
|-------|-----------|
| name  | macron |

---

### DDOS (POST)
Simule une attaque ddos sur un site donné en paramètre
```json
{
    "targetUrl": "https://mounier.paysdelaloire.e-lyco.fr/",
    "numberOfRequests": 50
}
```

---

### Domain info (GET)
Donne tous les domaines et sous-domaines associés à un nom de domaine
| Key   | Value     |
|-------|-----------------------|
| domain  | mounier.paysdelaloire.e-lyco.fr/ |

---

### Generate indentity (GET)
Génère une identité fictive (prénom, nom, email, addresse, ville, pays, téléphone)

--- 

### Generate password (GET)
Génère un mot de passe aléatoire
| Key   | Value     |
|-------|------|
| length  | 18 |
