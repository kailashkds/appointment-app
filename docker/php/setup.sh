#!/bin/bash
echo "185.199.108.133 raw.githubusercontent.com" >> /etc/hosts
cd /var/www/html
composer install
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load
php bin/console lexik:jwt:generate-keypair --skip-if-exists
yarn install
yarn encore dev
php -S 0.0.0.0:8000 -t public
