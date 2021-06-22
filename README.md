#installation in dev environnement 

$ docker-compose build

$ docker-compose up -d

- Se connecter au container php-ssl puis dans le root directory, executer les commandes 

$ sudo chown -R soukaina:www-data .
$ find . -type d -exec chmod u=rwx,g=rx,o= '{}' \;
$ find . -type f -exec chmod u=rw,g=r,o= '{}' \;

$ sudo chown -R soukaina:www-data . && find . -type d -exec chmod u=rwx,g=rx,o= '{}' \; && find . -type f -exec chmod u=rw,g=r,o= '{}' \;
Aller sur le navigateur et lancer l'installation
- En cas de blocage ssl côté BDD
ajouter la ligne 'skip-grant-tables' au fichier /etc/mysql/mysql.conf.d/mysqld.cnf
puis docker-compose stop puis docker-compose start



