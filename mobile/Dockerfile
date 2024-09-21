# pull base image
FROM node:18-bullseye-slim

# set our node environment, either development or production
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 19006 for node, and 19001 and 19002 for debug
ARG PORT=19006
ENV PORT $PORT
EXPOSE $PORT 19001 19002

# install global packages
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm --allow-root -g npm@latest expo-cli@latest

# install dependencies
RUN mkdir /opt/mobile
WORKDIR /opt/mobile
COPY mobile/package.json mobile/package-lock.json ./
RUN npm install

# copy source code
WORKDIR /opt/mobile/app
COPY ./mobile .

ENTRYPOINT ["npm", "run"]
CMD ["web"]
