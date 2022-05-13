# Job Search App

Job Search App built with Express, JSONWebToken, MongoDB and Mongoose.

## Getting Started
First, install all the dependencies of the project with:

```
npm install
```

Fill the details in a .env file taking into consideration the .env.example.

Run the development server:
```bash
npm run dev
# or
yarn dev
```

## Guide Rope

The project was centered in the Validation.

### Auth
```
POST /api/auth/signup
=> All validations are managed by one function
=> Required Validation [name, email, password]
=> Unique Validation [email]
=> Flattened Role "applicant" [Normalization Middleware]
=> Encryption
=> Gives you a Token :D

POST /api/auth/login
=> Gives you a Token too!

```

### Users
```
=> Token Verification Middleware
=> Role Validation Middleware through Closures [Admin]

GET /api/users
=> You need to be an Admin to see this content
=> If so, you could see all the data related to an user, in other words, the applications of that user!

GET /api/users/:id
=> You don't need to be an admin to see this stuff!
=> The fields that you are gonna see are restricted, you cannot see the password or the applications!

POST /api/users -> Requires body
=> You have to be an Admin to do something here!
=> If so, you can add any role to your user
=> Required and Unique Validation
=> Encryption

PUT /api/users/:id -> Requires Body
=> You have to be an Admin to do something here!
=> If so, you can add any role to your user
=> Encryption

DELETE /api/users/:id
=> You have to be an Admin to do something here!
```

### Offers
```
=> Token Verification Middleware
=> In all GET methods, you could see the comments!

GET /api/offers
=> Everybody can see the avaiable offers!

GET /api/offers/salary
=> Everybody could make a search!
=> Through a query on "min" and "max" you could search for jobs that are in an interval
=> You can dismiss min or max!

GET /api/offers/countries
=> Everybody could make a search!
=> Through a query on "country" you could search for jobs that match that Country

GET /api/offers/:id
=> Everybody could make a search!
=> With this endpoint, you can get more details about an offer

POST /api/offers
=> Only Employers or Admins could make this operation!
=> The idPublisher is normalized taking into consideration the Token!, [Is Mejorable]

POST /api/offers/addApplicant -> is Mejorable to /api/offers/:idOffer/addApplicant
=> Everybody could apply to an offer!
=> Validation

POST /api/offers/:idOffer/addComment
=> Everybody could attach a message in an Offer!
=> Validation

PUT /api/offers
DELETE /api/offers
=> In this two cases only the Employer that has published the offer could modify this offer, unless that person is an Admin
```
