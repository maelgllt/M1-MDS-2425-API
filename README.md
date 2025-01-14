# M1-MDS-2425-API - TP HackR - Maël GUILLOTEAU

## Technologies

- Node.js / Express
- JWT (Json Web Token) : pour l'authentification
- BDD : MySQL
- Swagger : pour la documentation

## Postman

Fichier json pour l'environnement de test "hackr_api". Les routes sont organisées en collection et le bearer est automatiquement transmis dans toutes les requêtes.

[hackr_api.postman_environment.json](hackr_api.postman_environment.json)

## Prérequis
- Node.js (https://nodejs.org/fr)
- MySQL (https://dev.mysql.com/downloads/)
- Git (https://git-scm.com/downloads)

## Cloner le projet
Créer un espace pour cloner le projet

```bash
git clone https://github.com/maelgllt/M1-MDS-2425-API.git
```

## Installer les dépendances
Une fois dans le dossier du projet, installer les dépendances Node.js en utilisant la commande suivante :

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
Dans un terminal, entrer la commande :

```bash
node app.js
```
