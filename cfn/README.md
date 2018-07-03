CloudFormation template
===

## Before setup

You have to finish provision AWS rewsources.
Please reference this README.md(../cfn/README.md)

Next, fix a couple of code in `app/src/index.js`.

Set your environment IdentityPoolId and IoT Core host.

> IdentityPoolId: 'ap-northeast-1:********-****-****-****-*************',

> host: '**************.iot.ap-northeast-1.amazonaws.com',

# How to deploy

```console
$ AWS_PROFILE=iot-ideathon # Fix me
$ STACK_NAME=team-organizer
$ CFN_S3_BUCKET=cf-templates-s3bucket-************* # Fix me
$ IOT_ENDPOINT=$(aws iot describe-endpoint | jq -r ".endpointAddress")
$ 
$ sam package --template-file template.yaml --output-template-file packaged.yaml --s3-bucket $CFN_S3_BUCKET
$ sam deploy --template-file packaged.yaml --stack-name $STACK_NAME --capabilities CAPABILITY_IAM --parameter-overrides IoTEndpoint=$IOT_ENDPOINT
```

# How to initialize DyanmoDB table

You can put initial items to your dynamodb table.

Items are divided because of the limit of items to upload by batch-write-item api.

```console
$ export AWS_PROFILE=iot-ideathon # Fix me
$ ls fixture | xargs -n 1 -I{} aws dynamodb batch-write-item --request-items file://$(pwd)/fixture/{} --profile ${AWS_PROFILE}
```