FROM node:16

WORKDIR /app

COPY ./.github/workflows/run.sh ./run.sh

COPY ./jormun-sync-api/dist .

COPY ./jormun-sync-api/public_html ./public_html
COPY ./jormun-sync-api/migrations ./migrations

COPY ./jormun-sync-api/package*.json ./

COPY ./maintanence.js ./maintanence.js

EXPOSE 5000

CMD ["/bin/bash", "run.sh"]