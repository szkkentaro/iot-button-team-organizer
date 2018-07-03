iot-button-team-organizer
===

This application offers to divide people to groups using AWS IoT button.

## How to provision AWS resource

[provision resources](./cnf/README.md)

## How to deploy web application

[deploy application](./app/README.md)

## Repository dir

```
$ tree -I node_modules
.
├── LICENSE
├── README.md
├── app                            // web application
│   ├── dist                       // static source
│   │   ├── bundle.js
│   │   ├── creator.png            // A role image (this image does not include this repo)
│   │   ├── facilitator.png        // A role image (this image does not include this repo) 
│   │   ├── index.html
│   │   ├── sales.png              // A role image (this image does not include this repo)
│   │   ├── style.css
│   │   └── winner.png             // A role image (this image does not include this repo)
│   ├── package.json
│   ├── src
│   │   ├── index.js
│   │   └── style.scss
│   └── webpack.config.js          // webpack conf
└── cfn                            // AWS Cloud Formation 
    ├── README.md
    ├── fixture                    // DynamoDB initial data
    ├── init.yaml                  // Create S3 bucket for Cloud Formation source
    ├── src                        // lambda functions source
    │   ├── gateway                // gateway from IoT button to DynamoDB
    │   │   ├── index.js
    │   │   └── package.json
    │   └── relay
    │       ├── index.js
    │       └── package.json
    └── template.yaml              // CloudFormation template written by SAM
```