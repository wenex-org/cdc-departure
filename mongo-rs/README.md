# Mongo-RS

Mongo replication set with four nodes, run and start with docker compose:

```sh
sudo mkdir -p -m 777 mongo/primary
sudo chown -R 1001 mongo
```

> NOTE: As this is a non-root container, the mounted files and directories must have the proper permissions for the UID 1001.

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
