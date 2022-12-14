## Introduction

A Voting game written with Nextjs Framework. The Database communication is abstracted by Sequelize library, hence almost any known DB technology can work with it. On every game round, a word will be picked and displayed on the main page based on the votes. In the next round the number of required votes will multiple by 2.

## Demo

check out the live demo on https://wallofwords.net/
## Preperation

add `.env.local` to the project's root folder, the following variables are expected in it:
```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY = "site_key"
RECAPTCHA_SECRET_KEY = "secret_key"
NEXT_PUBLIC_SERVER = "http://localhost:3000/"
```

create `config.json` file in `./database/config` and add database connection data such as the following:

```bash
{
  "development": {
    "username": "username",
    "password": "password",
    "database": "database",
    "host": "host",
    "dialect": "dialect",
    "use_env_variable": 0
  },
  "test": {
    "username": "username",
    "password": "password",
    "database": "database",
    "host": "host",
    "dialect": "dialect",
    "use_env_variable": 0
  },
  "production": {
    "username": "username",
    "password": "password",
    "database": "database",
    "host": "host",
    "dialect": "dialect",
    "use_env_variable": 0
  }
}
```
to switch between `development, test and production` either change the `NODE_ENV` variable on you OS (node) or change the default value of `env` variable in `./database/connection.js`


## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
