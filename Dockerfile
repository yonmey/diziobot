FROM node:lts-alpine3.10

RUN apk update && \
    apk add git
RUN git clone https://github.com/yonmey/diziobot

ENV BOT_TOKEN=$TELEGRAM_BOT_TOKEN
RUN cd diziobot && npm install && npm run-script build
WORKDIR /diziobot/build

ENTRYPOINT ["node", "main.js"]