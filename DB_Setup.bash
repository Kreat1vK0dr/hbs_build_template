#!/bin/bash
# RUN TO SET UP OR RESET DATABASE
mysql --local-infile -u <user> -p<password> < ./database-setup/database-setup.sql
