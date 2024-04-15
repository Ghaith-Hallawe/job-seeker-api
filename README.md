# Job seeker api

Node JS project based structure for creating an app to connect a company with a job seeker.

## Database migrations
- Create database based in the environment for development (job_seek_dev), for testing (job_seek_test), for production (job_seek_prod)
- Navigate to database directory
- Then run the migration using the following command:
 `npx sequelize-cli db:migrate`

## Run project
- yarn install
- yarn build
- yarn start
