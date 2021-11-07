# tiffin-capstone
Research in Computer Science Capstone project for Tiffin University 

## Structure
```
- packages
    - ui
        - VueApp and Amplify definitons
    - cloud
        - AWS Resource Definition and CFT
```

## UI

Vue Application using AppSync for GraphQL backend. Some of the data sources include DynamoDb tables with Lambdas for some resolvers.

### Deploy

```
    npm run deploy
```

It runs the generation of the Vue.js app by in turn executing `npm run build`. Then this is pushed to the S3 object that is wired up to CloudFront, Route 53 and Certificates to serve a secured site.
