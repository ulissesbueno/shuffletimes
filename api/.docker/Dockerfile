FROM php:8.1-fpm-alpine
#RUN apk add --no-cache mysql-client msmtp perl procps shadow libzip libpng libjpeg-turbo libwebp freetype icu npm git bash

# RUN apk add --no-cache --virtual build-essentials \
#     icu-dev icu-libs zlib-dev g++ make automake autoconf libzip-dev \
#     libpng-dev libwebp-dev libjpeg-turbo-dev freetype-dev && \
#     docker-php-ext-configure gd --enable-gd --with-freetype --with-jpeg --with-webp && \
#     docker-php-ext-install gd && \
#     docker-php-ext-install mysqli && \
#     docker-php-ext-install pdo_mysql && \
#     docker-php-ext-install intl && \
#     docker-php-ext-install opcache && \
#     docker-php-ext-install exif && \
#     docker-php-ext-install zip && \
#     docker-php-ext-install sockets && \
#     apk del build-essentials && rm -rf /usr/src/php*

RUN apk add --no-cache shadow git bash

RUN touch /home/www-data/.bashrc | echo "PS1='\w\$ '" >> /home/www-data/.bashrc

RUN chown www-data:www-data /var/www

ADD https://getcomposer.org/composer-stable.phar /usr/local/bin/composer
RUN chmod 755 /usr/local/bin/composer

#RUN npm config set cache /var/www/.npm-cache --global

RUN ln -s public html
RUN usermod -u 1000 www-data --shell /bin/sh --home /home/www-data

WORKDIR /var/www

USER www-data