FROM node:14.9.0-alpine

RUN mkdir -p /srv/app/id2207-frontend
WORKDIR /srv/app/id2207-frontend

COPY package.json /srv/app/id2207-frontend
COPY yarn.lock /srv/app/id2207-frontend

RUN yarn install

COPY . /srv/app/id2207-frontend

CMD ["yarn", "start"]