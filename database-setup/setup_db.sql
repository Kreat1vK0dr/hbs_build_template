# NOTE: RUN $ mysql --local-infile -u <user> -p BEFORE EXECUTING THIS SCRIPT
DROP DATABASE IF EXISTS app_db;
CREATE DATABASE app_db;
#CREATE USER user@localhost IDENTIFIED BY 'password';
#GRANT ALL PRIVILEGES ON app_db.* TO user@localhost;
#FLUSH PRIVILEGES;

USE app_db;
