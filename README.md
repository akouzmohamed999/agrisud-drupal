cd root_directory
sudo chown -R soukaina:www-data .
find . -type d -exec chmod u=rwx,g=rx,o= '{}' \;
find . -type f -exec chmod u=rw,g=r,o= '{}' \;

sudo chown -R soukaina:www-data . && find . -type d -exec chmod u=rwx,g=rx,o= '{}' \; && find . -type f -exec chmod u=rw,g=r,o= '{}' \;

# in case of a blocage of connection due to ssl issue
ajouter la ligne 'skip-grant-tables' au fichier /etc/mysql/mysql.conf.d/mysqld.cnf
puis docker-compose stop puis docker-compose start


