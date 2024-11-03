#!/bin/sh

/usr/sbin/ngssc insert /usr/share/nginx/html

exec nginx -g 'daemon off;'
