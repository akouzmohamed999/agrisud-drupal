#!/bin/bash
sed -i 's@\[MYSQL_ROOT_PASSWORD\]@'"$MYSQL_ROOT_PASSWORD"'@' .env.prod
sed -i 's@\[DATABASE_NAME\]@'"$DATABASE_NAME"'@' .env.prod
sed -i 's@\[DATABASE_HOST\]@'"$DATABASE_HOST"'@' .env.prod
sed -i 's@\[MYSQL_USER\]@'"$MYSQL_USER"'@' .env.prod
sed -i 's@\[MYSQL_PASSWORD\]@'"$MYSQL_PASSWORD"'@' .env.prod
cat .env.prod > .env
exec /upstream-entrypoint.sh "$@"