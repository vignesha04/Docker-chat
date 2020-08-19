# build environment
FROM node:13.11.0-alpine as builder
RUN mkdir -p /usr/src/client
WORKDIR /usr/src/client
ENV PATH /usr/src/client/node_modules/.bin:$PATH
COPY package.json /usr/src/client/package.json
COPY default.conf /usr/src/client/default.conf
RUN npm install --silent
COPY . /usr/src/client
RUN npm run build


# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /usr/src/client/build /usr/share/nginx/html
COPY --from=builder /usr/src/client/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
