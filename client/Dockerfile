# build environment
FROM node:10.5.0-alpine as builder
RUN mkdir -p /usr/src/client
WORKDIR /usr/src/client
ENV PATH /usr/src/client/node_modules/.bin:$PATH
COPY package.json /usr/src/client/package.json
COPY nginx.conf /usr/src/client/nginx.conf
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
COPY . /usr/src/client
RUN npm run build


# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /usr/src/client/build /usr/share/nginx/html
COPY --from=builder /usr/src/client/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
