# CDC Departure

Emigrate to the wenex ecosystem with [CDC](https://www.confluent.io/learn/change-data-capture/) and [Kafka Connect](https://docs.confluent.io/platform/current/connect/index.html) Connect from your old fashion SQL DBMS to the NoSQL solution of wenex with MongoDB, this is an example project to do it.

## Quick Start Guide

Before each please be sure to have the prerequisites:

- [ReplicaSet MongoDB](https://github.com/wenex-org/cdc-departure/tree/main/mongo-rs)
- Docker with Compose

To start and run the environment enter this command `docker-compose up -d` (extends with [ReplicaSet MongoDB](https://github.com/wenex-org/cdc-departure/tree/main/mongo-rs)) in your terminal while you located into this project, after that run the command `npm run db:seed` to create `example` MySQL database and the `fortest` table with sample data, then go to the [Kafka Connect](#kafka-connect) section and register connectors.

Look at your MongoDB to see the existing data in MySQL. If you want to manually sink with MongoDB start `sql-to-nosql` app with command `npm run start`. As i guess may you want to have bi-directional sink with mysql run the last source connector [MongoDB Source](#mongodb-source) and sink project with command `npm run start nosql-to-sql`.

### Kafka Connect

Kafka connect configurations with the source of mysql and mongodb sink, you can consume and manage Kafka cluster with [conduktor](https://www.conduktor.io/).

- [MySQL Source](#mysql-source)
- [MongoDB Sink](#mongodb-sink)
- [MongoDB Source](#mongodb-source)

#### MySQL Source

```sh
curl -i -X POST -H "Accept:application/json" -H "Content-Type:application/json" localhost:8083/connectors/ -d '{
  "name": "mysql-source",
  "config": {
    "connector.class": "io.debezium.connector.mysql.MySqlConnector",
    "tasks.max": "1",
    "database.hostname": "mysql",
    "database.port": "3306",
    "database.user": "root",
    "database.password": "admin",
    "topic.prefix": "mysql",
    "database.server.id": "184054",
    "include.schema.changes": "true",
    "database.include.list": "example",
    "database.allowPublicKeyRetrieval": "true",
    "schema.history.internal.kafka.bootstrap.servers": "kafka:9091",
    "schema.history.internal.kafka.topic": "schema-changes.example"
  }
}'
```

#### MongoDB Sink

```sh
curl -i -X POST -H "Accept:application/json" -H "Content-Type:application/json" localhost:8083/connectors/ -d '{
  "name": "mongo-sink",
  "config": {
    "connector.class": "com.mongodb.kafka.connect.MongoSinkConnector",
    "topics": "mysql.example.fortest",
    "tasks.max": "1",
    "connection.uri": "mongodb://root:password123@mongodb-primary:27017,mongodb-secondary:27018,mongodb-arbiter:27019/?replicaSet=rs0&authSource=admin",
    "key.converter.schemas.enable": "false",
    "key.converter": "org.apache.kafka.connect.storage.StringConverter",
    "database": "example",
    "collection": "fortest",
    "delete.on.null.values": "true",
    "document.id.strategy.overwrite.existing": "true",
    "document.id.strategy": "com.mongodb.kafka.connect.sink.processor.id.strategy.ProvidedInKeyStrategy",
    "writemodel.strategy": "com.mongodb.kafka.connect.sink.writemodel.strategy.InsertOneDefaultStrategy",
    "change.data.capture.handler": "com.mongodb.kafka.connect.sink.cdc.debezium.rdbms.mysql.MysqlHandler",
    "transforms": "hk",
    "transforms.hk.type": "org.apache.kafka.connect.transforms.HoistField$Key",
    "transforms.hk.field": "_id"
  }
}'
```

#### MongoDB Source

Only, if you want to have bi-directional sink with your old system.

```sh
curl -i -X POST -H "Accept:application/json" -H "Content-Type:application/json" localhost:8083/connectors/ -d '{
  "name": "mongo-source",
  "config": {
    "connector.class": "io.debezium.connector.mongodb.MongoDbConnector",
    "mongodb.connection.string": "mongodb://root:password123@mongodb-primary:27017,mongodb-secondary:27018,mongodb-arbiter:27019/?replicaSet=rs0&authSource=admin",
    "topic.prefix": "mongo",
    "collection.include.list": "wenex.fortests"
  }
}'
```
