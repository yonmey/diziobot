FROM node:8-stretch

RUN git clone https://yonmey:password@bitbucket.org/mountainhare/diziobot.git
ARG TTOKEN
ENV BOT_TOKEN=$TTOKEN
RUN cd diziobot && npm install && npm run-script build
WORKDIR /diziobot