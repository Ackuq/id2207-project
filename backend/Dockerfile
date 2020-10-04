FROM node:14.9.0-alpine

RUN mkdir -p /srv/app/id2207-backend
WORKDIR /srv/app/id2207-backend

COPY package.json /srv/app/id2207-backend
COPY yarn.lock /srv/app/id2207-backend

RUN yarn install

COPY . /srv/app/id2207-backend

CMD ["yarn", "start:mock"]