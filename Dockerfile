FROM node:14-alpine 

WORKDIR /src
# ADD package.json /src/package.json
COPY package*.json ./
RUN npm ci

COPY . .
EXPOSE 3000
# RUN chown postgres:postgres /docker-entrypoint-initdb.d/dbinit.sql

CMD npm start