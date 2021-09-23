FROM node:14.17.3-alpine3.13 as gulp

# Install Gulp globally
# For using gulp command in terminal
RUN npm install -g gulp

COPY ./web/themes/custom/norsys_base /home/node/app
COPY ./web/themes/custom/norsys_base/package.json /home/node/app/package.json

WORKDIR /home/node/app
RUN npm install
RUN gulp sass

FROM php:7.4-apache-buster

COPY --chown=www-data:www-data --chmod=775 . /var/www/html/
COPY ./deploy/config/apache.conf /etc/apache2/sites-enabled/000-default.conf

# Prepare apt
RUN apt-get update

# >> start of drupal recommanded configurations
RUN apt-get install default-mysql-client -y

# install the PHP extensions we need
RUN set -eux; \
	\
	if command -v a2enmod; then \
		a2enmod rewrite; \
	fi; \
	\
	savedAptMark="$(apt-mark showmanual)"; \
	\
	apt-get update; \
	apt-get install -y --no-install-recommends \
		libfreetype6-dev \
		libjpeg-dev \
		libpng-dev \
		libpq-dev \
		libzip-dev \
	; \
	\
	docker-php-ext-configure gd \
		--with-freetype \
		--with-jpeg=/usr \
	; \
	\
	docker-php-ext-install -j "$(nproc)" \
		gd \
		opcache \
		pdo_mysql \
		pdo_pgsql \
		zip \
	; \
	\
# reset apt-mark's "manual" list so that "purge --auto-remove" will remove all build dependencies
	apt-mark auto '.*' > /dev/null; \
	apt-mark manual $savedAptMark; \
	ldd "$(php -r 'echo ini_get("extension_dir");')"/*.so \
		| awk '/=>/ { print $3 }' \
		| sort -u \
		| xargs -r dpkg-query -S \
		| cut -d: -f1 \
		| sort -u \
		| xargs -rt apt-mark manual; \
	\
	apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false; \
	rm -rf /var/lib/apt/lists/*

# set recommended PHP.ini settings
# see https://secure.php.net/manual/en/opcache.installation.php
RUN { \
		echo 'opcache.memory_consumption=128'; \
		echo 'opcache.interned_strings_buffer=8'; \
		echo 'opcache.max_accelerated_files=4000'; \
		echo 'opcache.revalidate_freq=60'; \
		echo 'opcache.fast_shutdown=1'; \
	} > /usr/local/etc/php/conf.d/opcache-recommended.ini

COPY --from=composer:2 /usr/bin/composer /usr/local/bin/
# Install Drush
# Set the Drush version.
ENV DRUSH_VERSION 8.4.6

# Install Drush 8 with the phar file.
RUN curl -fsSL -o /usr/local/bin/drush "https://github.com/drush-ops/drush/releases/download/$DRUSH_VERSION/drush.phar" && \
  chmod +x /usr/local/bin/drush
# Clean repository
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
# <<End of drupal recommanded configurations

RUN php -d memory_limit=-1 /usr/local/bin/composer install
COPY --from=gulp /home/node/app/src/css /var/www/html/web/themes/custom/norsys_base/src/css

COPY --chown=www-data:www-data --chmod=775 ./config/dev/files-bkup /var/www/html/web/sites/default/files
RUN mkdir -p /var/www/html/web/sites/default/translations

COPY --chown=www-data:www-data --chmod=444 ./web/sites/default/settings.example.php /var/www/html/web/sites/default/settings.php

COPY --chown=www-data:www-data --chmod=775 ./web/sites/default/slider-images/* /var/www/html/web/sites/default/files

# Work directory
WORKDIR /var/www/html