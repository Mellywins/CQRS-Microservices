# CQRS Project Scaffolded sandbox
## Architecutre
![plot](Diagram.jpg)
## Summary
This project is my implementation of the CQRS microservices using NestJS.
The cluster is composed of 2 Microservices each holding the responsibilities of reading and writing from/into elasticsearch/mongodb.
Another Synchronisation microservice that sits between mongo and ES to make sure the contents written in mongo are coherent with the content in elasticsearch.
An API gateway for the end user to make calls to.
All of environment is run on a docker-compose stack.
## TODO
Work on exceptions' returns to the API gateway when they occur in the microservices