# yt-search-api

## Run on local system

1.  Rename `.env.dev` as `.env`.

2.  Fill up the values

3.  Install bun

4.  Install dependency `bun install`.

5.  Run `bun run dev`.

6.  Run a mongo db container in parallel

```shell
docker run -it -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=user \
    -e MONGO_INITDB_ROOT_PASSWORD=password \
    -e MONGO_INITDB_DATABASE=dbName \
    mongo:latest
```

## Run with docker

1.  Rename `.env.dev` as `.env`.

2.  Fill up the values

3.  Run `docker compose up`

## Info

- **GET:http://localhost:3000/api/v1/videos** : Used both as search with keyword and also to get rows

- **Add multiple keys** - Use csv format for multiple keys in YT_KEY `.env` like key1, key2, key3

### GET Api Params

- **search** : for keyword match

- **limit** : for page size

- **skip** : to offset the documents

### Bonus ✅

1. Multiple api key support.

2. Optimize
