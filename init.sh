echo ">> composer install"
docker-compose run --rm php-ssl php -d memory_limit=-1 /usr/local/bin/composer install

echo ">> Working on missing files and file permissions ..."
mkdir /web/sites/default/files
mkdir /web/sites/default/translations

chmod a+w sites/default/files
chmod -R 755 .
chmod 444 web/sites/default/settings.php

echo ">> Importing the initial database..."
docker exec -i drupal-8-socle_db_1 mysql -unorsys2021 -p1 agrisudweb < database/20210707.sql

echo ">> fin"

