# Boa - Backend

## Project structure
```
.
├── index.js       # Entry point
├── package.json   # Dependencies and scripts
├── README.md      # You are here
└── src
  ├── middlewares # Custom Express middlewares
  ├── models      # Database models
  ├── routes      # Express routes
  ├── schemas     # Zod validation schemas
  ├── services    # Business logic (services layer)
  └── utils       # Utility/helper functions
```

## Project Set-up

### Install dependecies:
```bash
npm i
```
### Create database
1. Move to the root of the repository.

2. Create the database
```bash
mysql -u root -p < db/schema.sql
```

3. Seed the database:
```bash
mysql -u root -p  < db/base_seeder.sql
```

### Setting enviroment variables:

1. Create the `.env` file:
```
cp .env.example .env
```

2. The `.env` file must have the following fields:

```bash
# APP
APP_PORT=3000
APP_KEY=

# MYSQL
MYSQL_DB_HOST=localhost
MYSQL_DB_USER=your-user
MYSQL_DB_NAME=your-db-name
MYSQL_DB_PASSWORD=your-password
MYSQL_DB_PORT=3306
```

3. To create a new `APP_KEY` run the following script:
```bash
node -e "console.log(crypto.randomBytes(32).toString('hex'))"
```
4. Set the resultant key:
```
APP_KEY=the-resultant-key
```
