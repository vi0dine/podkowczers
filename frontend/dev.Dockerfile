# base image
FROM node:12

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn global add node-sass
RUN yarn install
RUN yarn global add react-scripts
RUN npm rebuild node-sass

COPY . /app

CMD yarn start
