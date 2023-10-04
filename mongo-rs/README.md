# Mongo-RS

Mongo replication set with three nodes, run and start with docker compose:

```sh
docker-compose up -d
```

> NOTE: It will take time to initiate for first time

Add this lines to `/etc/hosts`:

```sh
127.0.0.1 mongodb-primary
127.0.0.1 mongodb-secondary
127.0.0.1 mongodb-arbiter
```

## Connection URI

`mongodb://root:password123@mongodb-primary:27017,mongodb-secondary:27018,mongodb-arbiter:27019/?replicaSet=rs0&authSource=admin`

### Reference

- [https://github.com/bitnami/containers/tree/main/bitnami/mongodb](https://github.com/bitnami/containers/tree/main/bitnami/mongodb)
