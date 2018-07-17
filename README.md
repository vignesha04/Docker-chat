# Radix Simple Chat

Divide the socket.io sample app into react.js and node.js.

## Getting Started

App with multiple container. Reverse proxy.
![Screen Shopt](images/reverse-proxy.png?raw=true "Screen Shot")

There are two containers.
  * front-end(nginx+react.js)
  * back-end(node.js)

To use the internal DNS between two containers, Nginx works as a reverse proxy.



### Prerequisites

Make sure you have already installed both Docker Engine and Docker Compose.
You don’t need to install node.js or react.js, as both are provided by Docker images.


```
$ docker -v
Docker version 18.03.1-ce, build 9ee9f40
$ docker-compose -v
docker-compose version 1.21.1, build 5a3f1a3
```

### Installing

```
git clone https://github.com/MuchasEstrellas/radix-simple-chat.git
cd radix-simple-chat
docker-compose up
```




## Running the tests

TBD

### Break down into end to end tests

TBD


### And coding style tests

TBD

## Deployment

**When you use docker-compose up, your local machine is using `docker-compose.yaml`, but the platform use the `radixconfig.yaml`. Make sure that your `radixconfig.yaml` is correct.**

Please, follow the steps in the Omnia Radix wiki page.

## Built With

* [Nginx](https://nginx.org/en/) - Web server
* [Socket.io](https://github.com/socketio/socket.io) - Websocket library
* [React.js](https://reactjs.org/) - The front-end framework used
* [Docker](https://www.docker.com/) -  Containerization



## Authors

* **Jungwon Seo** - *Initial work* - [MuchasEstrellas](https://github.com/MuchasEstrellas)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
