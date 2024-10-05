FROM node:18-alpine3.20 AS build

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build --configuration production

FROM nginx:alpine AS run
WORKDIR /app

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/sistem-wiki/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
