echo ">>Installation in dev environement"
cp .env.example .env
docker-compose build
docker-compose up -d

echo ">> composer install"
docker-compose run --rm php-ssl php -d memory_limit=-1 /usr/local/bin/composer install

echo ">> Working on missing files and file permissions ..."
echo ">> chown -R $USER:www-data ."
sudo chown -R $USER:www-data .
sudo mkdir -p web/sites/default/files
sudo mkdir -p web/sites/default/translations

sudo chmod a+w web/sites/default/files
sudo chmod -R 755 .
sudo chmod -R 775 web/sites/default
cp web/sites/default/settings.example.php web/sites/default/settings.php
sudo chmod 444 web/sites/default/settings.php

#echo ">> Importing the initial database..."
#docker exec -i agrisud-web_db_1 mysql -unorsys2021 -p1 agrisudweb < database/dump-*.sql

echo ">> fin"

