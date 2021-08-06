#Installation in dev environement
`sudo chmod +x init.sh`

`./init.sh`
#Visualiser le site 
Aller sur `localhost:8443/web`

#Import de la BDD
Voir dans le fichier init.sh
##Troubleshooting
En cas de blocage ssl côté BDD
ajouter la ligne 'skip-grant-tables' au fichier /etc/mysql/mysql.conf.d/mysqld.cnf
puis docker-compose stop puis docker-compose start

`echo 'skip-grant-tables' >> /etc/mysql/mysql.conf.d/mysqld.cnf`
`docker-compose restart`

#Building sass
`docker-compose run --rm gulp gulp watch`
`docker-compose run --rm gulp npm install`
