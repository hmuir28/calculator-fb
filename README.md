# General Information
This project was implemented as part of my university student duties, it is a simple calculator with a firebase database and a validator of regular expressions for email, date and DNI formats.

The data stored in Firebase is regarding the structure of simple arithmetic operations, for example:

```
num1 operator num2
```

I would like to bring up that the firebase database is not working independently of the user (I know it's weird) in other words is the same data for every single user, but as I said it's a simple calculator to show how compilers destructure an arithmetic operation in the syntactic phase.

# Prerequisites

In order to setup this project locally, you will need to install node the version *12* (you may want to use **nvm** instead).

## Project setup

Install the dependencies.
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Lints and fixes files
```
npm run lint
```

**Note:** Firebase is not going to work locally.
