FROM node:18-alpine3.20 AS build

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

#RUN yarn build --configuration production
RUN yarn ngsscbuild

FROM nginx:alpine AS run
WORKDIR /app

RUN rm -rf /usr/share/nginx/html/*

ADD https://github.com/kyubisation/angular-server-side-configuration/releases/download/v18.2.0/ngssc_64bit /usr/sbin/ngssc
RUN chmod +x /usr/sbin/ngssc

COPY --from=build /app/dist/sistem-wiki/browser /usr/share/nginx/html

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

CMD ["/entrypoint.sh"]
