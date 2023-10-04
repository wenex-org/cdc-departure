# CDC Departure

Emigrate to the wenex ecosystem with CDC and Kafka Connect from your old fashion SQL DBMS to the NoSQL solution of wenex with MongoDB, this an example project to do this.

## Quick Start Guide

Before each please be sure to have the prerequisites:

- Docker with Docker Compose

To start and run the environment enter this command `docker-compose up -d` in your terminal while you located into this project, after that run the command `npm run db:seed` to generate `example` MySQL database and the `fortest` table with sample data, then go to the [Kafka Connect](#kafka-connect) section and register two connectors.

Look at your MongoDB to see the existing data in MySQL. If you want to manually sink with MongoDB start `sql-to-nosql` app with command `npm run start`.

### Kafka Connect

Kafka connect configurations with the source of mysql and mongodb sink.

- [MySQL Source](#mysql-source)
- [MongoDB Sink](#mongodb-sink)

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
    "connection.uri": "mongodb://root:admin@mongo:27017/?authSource=admin",
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
