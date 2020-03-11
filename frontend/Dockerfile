FROM node:12 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build:prod

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf etc/nginx/conf.d/default.conf
COPY --from=builder app/build usr/share/nginx/html