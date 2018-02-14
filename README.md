# Gig Center

A full stack web application to help bands and musicians manage details for upcoming gigs. Solves the problem of having to sort through and locate pieces of information in multiple locations (long email chains, text messages, etc.). Users can log into the app and immediately see the events they’ve been scheduled for. They can select a specific gig to view the details. Gigs can also be added and specific band members can be scheduled for that gig. Song lists can also be added to a gig from a database of songs. 

See a live version of the app at https://gig-center.herokuapp.com/#/home 

## Built With

PostgreSQL, Express.js, AngularJS, Node.js, and AngularJS Material

### Installing

Steps to get the development environment running.

```sql
CREATE TABLE "gig_center" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);
```

## Screen Shots


## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.

- [x] Feature a
- [x] Feature b

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Feature c

## Deployment

Add additional notes about how to deploy this on a live system

## Author

* Ryan DeCook


