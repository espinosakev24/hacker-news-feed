FROM node:14

RUN mkdir /usr/src/hn-feed-app

WORKDIR /usr/src/hn-feed-app

COPY . .

RUN npm install

EXPOSE 4000

# ARG CURRENT_ENV

# CMD if [ "$CURRENT_ENV" = "dev" ] ; then [ "npm", "run", "start:dev" ] else [ "npm", "start" ] ; fi
CMD [ "npm", "run", "start:dev" ]