# M1-MDS-2425-API - TP HackR - Maël GUILLOTEAU

## Technologies

- Node.js / Express
- JWT (Json Web Token) : pour l'authentification
- BDD : MySQL
- Swagger : pour la documentation

## Mise en ligne

J'ai déployé mon app sur mon VPS mais je ne peux plus m'y connecter via ssh (car j'ai dû fermer le port 22 sans faire exprès). J'ai donc pas eu le temps de mettre ma bdd dessus. (Seul le endpoint du swagger est accessible : [/swagger](http://mael.guilloteau.angers.mds-project.fr/swagger))   
**Il faut donc installer l'api.**
        
# INSTALLATION
## Prérequis
- Node.js (https://nodejs.org/fr)
- MySQL (https://dev.mysql.com/downloads/)
- Git (https://git-scm.com/downloads)

## .env et logs

Récupérer le fichier .env envoyé sur Teams et le placer à la racine du projet. Des logs pour se connecter en tant qu'admin et en tant que user également sont envoyés sur Teams.

## Cloner le projet
Créer un espace pour cloner le projet

```bash
git clone https://github.com/maelgllt/M1-MDS-2425-API.git
```

## Installer les dépendances
Une fois dans le dossier du projet, installer les dépendances Node.js en utilisant la commande suivante :

```bash
cd .\M1-MDS-2425-API\
```

```bash
npm install
```

## Importer la base de données
1. Avoir installé MySQL
    - SI NECESSAIRE, ajouter le chemin de mysql à la variable d'environnement PATH. Souvent le chemin est celui-ci : "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"

2. Ouvrir un terminal ou une invite de commande (cmd).

3. Se connecter au serveur MySQL avec la commande :

```bash
mysql -u [username] -p
```

Par défaut, le username est : root

4. Créez une base de données vide nommée **hackr_api** :

```sql
CREATE DATABASE hackr_api;
```

Vérifier que la base est créee : 

```sql
SHOW DATABASES;
```

5. Importer le fichier SQL
- Quitter MySQL

```bash
exit
```

- Exécutez cette commande pour importer le fichier dump.sql dans la base de données hackr_api :

```bash
mysql -u [username] -p hackr_api < chemin/vers/dump.sql
```

## Démarrer le serveur
Dans un terminal, entrer la commande suivante pour démarrer le serveur (⚠️ se placer dans le dossier du projet) :

```bash
node app.js
```

## Postman

Fichier json pour l'environnement "hackr_api" qui contient une variable (access_token) permettetant la transmission automatique du bearer dans toutes les requêtes.   
[hackr_api.postman_environment.json](Postman/hackr_api.postman_environment.json)

Fichier json pour la collection contenant l'ensemble des routes.   
[hackr_api.postman_collection.json](Postman/hackr_api.postman_collection.json)

**Lors des tests des requêtes, il faut sélectionner l'environnement "hackr_api"**

## Configuration

Les endpoints suivants sont accessibles sans avoir besoin de se login :
- /register
- /login
- /swagger

Les endpoints suivants sont accessibles par les users :
- /email-check

Les admins ont accès à l'ensemble des endpoints.
