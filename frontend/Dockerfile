FROM node:14-alpine as builder
LABEL maintainer=donkeysharp
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json /opt/app/package.json
COPY package-lock.json /opt/app/package-lock.json
RUN npm install
COPY ./src/ /opt/app/src/
COPY ./public/ /opt/app/public/
RUN npm run build


FROM nginx:alpine
LABEL maintainer=donkeysharp
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /opt/app/build/ /opt/frontend
RUN chown -R nginx:nginx /opt/frontend
