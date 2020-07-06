FROM node:alpine
LABEL maintainer=donkeysharp

RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json /opt/app/package.json
COPY package-lock.json /opt/app/package-lock.json
RUN npm install

COPY ./ /opt/app/
CMD ["npm", "start"]
