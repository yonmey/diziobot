FROM node:8-stretch

RUN git clone $GIT_URL
ARG TELEGRAM_BOT_TOKEN
ENV BOT_TOKEN=$TELEGRAM_BOT_TOKEN
RUN cd diziobot && npm install && npm run-script build
WORKDIR /diziobot