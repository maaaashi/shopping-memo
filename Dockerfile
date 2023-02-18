FROM node:18.14-alpine3.16

RUN apk update && \
    apk upgrade && \
    apk add --no-cache make gcc g++ python3 && \
    npm i -g pnpm serverless

WORKDIR /var/www/app

USER node

CMD ["/bin/sh", "-c", "sh"]
