#Installation in dev environement
`cp .env.example .env`

`docker-compose build`

`docker-compose up -d`



`sudo chmod +x init.sh`

`./init.sh`

##Troubleshooting
En cas de blocage ssl côté BDD
ajouter la ligne 'skip-grant-tables' au fichier /etc/mysql/mysql.conf.d/mysqld.cnf
puis docker-compose stop puis docker-compose start

`echo 'skip-grant-tables' >> /etc/mysql/mysql.conf.d/mysqld.cnf`
`docker-compose restart`


