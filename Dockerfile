FROM node:16.14.2-alpine

WORKDIR home/node/app

RUN mkdir /home/node/storage && chown node:node -Rf /home/node/storage

RUN apk add --no-cache \
    yarn \
    musl-dev

COPY package.json yarn.lock ./

RUN yarn

RUN npx prisma generate

COPY next.config.js ./next.config.js

CMD [ "yarn", "dev" ]
