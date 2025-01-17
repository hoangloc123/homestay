# NODE_PROJECT

This is a template for a MERN node project.

## Install packages

### Backend

To install backend's dependencies:

```shell
yarn install
```

### Frontend

To install frontend's dependencies:

```shell
cd frontend
```

```shell
yarn install
```

## Configuration

| Environment name               | Description                                                                               | Default value |
|--------------------------------|-------------------------------------------------------------------------------------------|---------------|
| `PORT`                         | Default PORT of the `backend` application.                                                | 5000          |
| `MONGO_URI`                    | MongoDB URI `srv connection string` to clusters. See [how to get it](#connect-to-mongodb). | **N/A**       |
| `FIREBASE_API_KEY`             | Firebase project API key. See [how to get it](#connect-to-firebase).                      | **N/A**       |
| `FIREBASE_AUTH_DOMAIN`         | Firebase authorization domain. See [how to get it](#connect-to-firebase).                 | **N/A**       |
| `FIREBASE_APP_ID`              | Firebase App ID. See [how to get it](#connect-to-firebase).                               | **N/A**       |
| `FIREBASE_PROJECT_ID`          | Firebase project ID. See [how to get it](#connect-to-firebase).                           | **N/A**       |
| `FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender id. See [how to get it](#connect-to-firebase).                                                            | **N/A**       |
| `FIREBASE_STORAGE_BUCKET`      | Firebase storage bucket. See [how to get it](#connect-to-firebase).                                                                 | **N/A**       |

## Connect to MongoDB

1. Please see and follow the [Introduction to MongoDB Connection Strings](https://www.mongodb.com/resources/products/fundamentals/mongodb-connection-string) for tutorials.
2. Once you opened a cluster and successfully have the `srv connection string`, please create the corresponding environment variables at `.env`.

## Connect to Firebase

1. Make sure that you [Install Firebase CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli) or [update to its latest version](https://firebase.google.com/docs/cli#update-cli).
2. Create a firebase project and register a web app follow [step 1 in this document](https://firebase.google.com/docs/web/setup#create-firebase-project-and-app).
3. Create these environment variables in `.env` with the same content as the `.env.local` file and set their values with app setting values generated by firebase.
4. Login firebase with your account.

```shell
firebase login
```

## Run source

### !!! Before run

Create a **.env** file from the template of **.env.local**.
Please replace all these environment variables with your respective values.


### Run backend

To run the backend source, use this command:

```shell
yarn backend
```

### Run frontend

To run the frontend source, use this command:

```shell
yarn frontend
```

### Run both frontend and backend

To run all source, use this command:

```shell
yarn full
```

After this command, the application will be run on:

- Port 5000 for `Backend`.
- http://localhost:5173 for `Frontend`.

## Testing

To run all tests, use this command:

```shell
yarn test
```

### Coverage threshold

**In the implementation**, the coverage threshold should be:

- Branches: 80%
- Functions: 70%
- Lines & Statements: 80%

## /!\ Before commit

Make sure to run the command bellow:

```shell
yarn format
```
