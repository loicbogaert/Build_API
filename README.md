## Piquante

Le but du projet était de créer une API sécurisée pour une application d'avis gastronomique

Le projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.

Pour faire fonctionner le projet, vous devez installer node-sass à part.

## Development server

Démarrer `ng serve` pour avoir accès au serveur de développement. Rendez-vous sur `http://localhost:4200/`. L'application va se recharger automatiquement si vous modifiez un fichier source.

## Pour démarrer le projet simplement

-> Créer un fichier ".env" dans le fichier "backend" contenant : <br> 
   1) SECRET_TOKEN= (Clé qui sera utilisée pour le token d'authentification) <br> 
   2) BDD_LOGIN= '(Lien de connection à la base de donnée mongodb)' <br> 
   3) CRYPTOJS_KEY= "(Clé qui sera utilisée pour récupérer les données chiffrée par cryptoJS)" <br>
   4) CRYPTOJS_IV= "(Vecteur d'initialisation pour cryptoJS)" <br>


-> Ouvrir le terminal : 1) npm i node-sass. <br>
                     2) npm start. <br>
                     3) Ouvrir le dossier "backend" dans le terminal. <br>
                     4) npm i mongoose. <br>
                     5) nodemon server. <br>
                     6) Se rendre sur localhost:4200
