sudo apt-get update
sudo apt-get upgrade

; ----------------
; 2. Stop Apache
; ----------------

sudo systemctl status apache2
sudo systemctl is-enabled apache2
;sudo systemctl disable apache2
sudo systemctl stop apache2
; sudo systemctl mask apache2


; ----------------
; 4. How to Install Nginx Latest Version on Ubuntu 20.04
; ----------------

sudo nano /etc/apt/sources.list.d/nginx.list
; add following lines
> deb [arch=amd64] http://nginx.org/packages/mainline/ubuntu/ focal nginx
> deb-src http://nginx.org/packages/mainline/ubuntu/ focal nginx

wget http://nginx.org/keys/nginx_signing.key

sudo apt-key add nginx_signing.key
sudo apt update
sudo apt install nginx

; -----------------
; Firewall
; ------------------
sudo ufw allow 'Nginx HTTP'
sudo ufw status

sudo systemctl start nginx
sudo systemctl enable nginx
nginx -v

; ----------------
; Delete "default" site
; ------------------
sudo unlink /etc/nginx/sites-enabled/default

; ----------------
; Link "nelgroup.biz" site
; ------------------
sudo ln -s /etc/nginx/sites-available/nelgroup.biz /etc/nginx/sites-enabled/


; ----------------
; letEncrypt: 
; https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04
; -----------

; ----------------
; letEncrypt: install certbot via snap
; ----------------
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

; ----------------
; letEncrypt: generate certificate
; ----------------
sudo certbot --no-eff-email --redirect --hsts --staple-ocsp --nginx -d nelgroup.biz -d www.nelgroup.biz

; ----------------
; letEncrypt: auto renew
; ----------------
sudo systemctl status certbot.timer
sudo certbot renew --dry-run


; ----------------
; setup firewall HTTPS
;
; ----------------
sudo ufw allow 'Nginx Full'
sudo ufw delete allow 'Nginx HTTP'

sudo ufw status


;--------------
; Log
;_______________
sudo cat /var/log/nginx/error.log | less
sudo cat /var/log/nginx/access.log | less
sudo tail /var/log/nginx/error.log -n 200

; ------------------
; Folders
; ------------------
;sudo mkdir -p /var/www/nelgroup.biz/html
;sudo chown -R $USER:$USER /var/www/nelgroup.biz/html
;sudo chmod -R 755 /var/www/nelgroup.biz

;sudo chgrp -R www-data /var/www/nelgroup.biz/codeigniter/writable
;sudo setfacl -Rm u:git:rwx /var/www/nelgroup.biz/codeigniter/writable
;sudo chmod -R 2775 /var/www/nelgroup.biz/codeigniter/writable
;sudo chmod -R 755 /var/www/nelgroup.biz/codeigniter/writable/**/index.html

sudo setfacl -Rm u:git:rwx /etc/nginx/templates

sudo setfacl -R -m u:git:rwx /etc/nginx/sites-available/nelgroup.biz
sudo setfacl -R -m g:www-data:2775 /var/www/nelgroup.biz/codeigniter/writable

; ---------------
; Install Node 18
; ---------------
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install nodejs
node -v
sudo npm install -g npm
npm -v

; ---------
; Install PNPM
; -------------
curl -fsSL https://get.pnpm.io/install.sh | sh -
source ~/.bashrc
pnpm -v

; ----------
; Install PM2
; ---------
sudo npm i -g pm2
sudo pm2 startup
sudo pm2 start ~var/www/node-test/server.js
sudo pm2 save