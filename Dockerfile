FROM node:lts-alpine3.10

RUN apk update && \
    apk add git

RUN git clone https://github.com/yonmey/diziobot

WORKDIR /diziobot

RUN yarn install && \
    yarn build

ENTRYPOINT ["yarn", "start"]
