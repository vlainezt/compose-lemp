FROM node

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY /backend/package.json .
RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY /backend/. .

EXPOSE 3900

CMD nodemon -L --watch . index.js
