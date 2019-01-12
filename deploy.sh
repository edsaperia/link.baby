#!/bin/bash
export SLS_DEBUG=*
export STAGE=production

export APP_KP_NAME=packs-prod
export BASION_KP_NAME=packs-prod
export AWS_ACC_ID=346955881824
export AWS_REGION=eu-west-1

if [ -n "$AWS_CONTAINER_CREDENTIALS_RELATIVE_URI" ]
then
    nohup /usr/local/bin/dockerd --host=unix:///var/run/docker.sock --host=tcp://0.0.0.0:2375 --storage-driver=overlay&
    timeout -t 15 sh -c "until docker info; do echo .; sleep 1; done"

    AWS_ACCESS_KEY_ID=`curl --silent http://169.254.170.2:80$AWS_CONTAINER_CREDENTIALS_RELATIVE_URI | jq -r '.AccessKeyId'`
    AWS_SECRET_ACCESS_KEY=`curl --silent http://169.254.170.2:80$AWS_CONTAINER_CREDENTIALS_RELATIVE_URI | jq -r '.SecretAccessKey'`
    AWS_SESSION_TOKEN=`curl --silent http://169.254.170.2:80$AWS_CONTAINER_CREDENTIALS_RELATIVE_URI | jq -r '.Token'`

    export AWS_ACCESS_KEY_ID
    export AWS_SECRET_ACCESS_KEY
    export AWS_SESSION_TOKEN

    aws s3 --region $AWS_REGION cp s3://packs-secrets/$STAGE.sh secrets.sh
fi

chmod a+x secrets.sh
source secrets.sh

export DB_PASSWORD
export SLACK_WEBHOOK_URL
export MY_IP_ADDRESS
export GITHUB_TOKEN

export AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY
export AWS_SESSION_TOKEN

export ANDROID_PA_ARN
export IOS_PA_ARN
export IOS_SBX_PA_ARN
export FACEBOOK_APP_ID
export FACEBOOK_APP_SECRET
export FIREBASE_PROJECT_ID
export FIREBASE_CLIENT_EMAIL
export FIREBASE_PRIVATE_KEY
export FIREBASE_DATABASE_URL
export ANDROID_IAP_KEY

aws s3 --region $AWS_REGION cp s3://packs-config/config.json config.json

cd platform

./init.sh
# ./deploy.sh

cd ..

terraform="docker run \
    -v `pwd`/platform:/src \
    -w /src \
    -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
    -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN \
    -e TF_VAR_ssh_allowed_ip=$MY_IP_ADDRESS \
    -e TF_VAR_key_pair_name=$APP_KP_NAME \
    -e TF_VAR_bastion_key_pair_name=$BASION_KP_NAME \
    -e TF_VAR_db_password=$DB_PASSWORD \
    -e TF_VAR_slack_webhook_url=$SLACK_WEBHOOK_URL \
    -e TF_VAR_github_token=$GITHUB_TOKEN \
    hashicorp/terraform:light"

output=`$terraform output -json`

export DATABASE_URL=`echo $output | jq  -r .db_hostname.value`
export DATABASE_DB=`echo $output | jq  -r .db_database_name.value`
export DATABASE_USER=`echo $output | jq  -r .db_username.value`

export SEC_GROUP_1=`echo $output | jq  -r .security_internal_id.value`
export SEC_GROUP_2=`echo $output | jq  -r .security_internal_id.value`
export SUBNET_ID_1=`echo $output | jq .subnet_internal_ids.value | jq 'split(",")' | jq -r '.[0]'`
# export SUBNET_ID_2=`echo $output | jq .subnet_internal_ids.value | jq 'split(",")' | jq -r '.[1] | .[0]'`
export SUBNET_ID_2=`echo $output | jq .subnet_internal_ids.value | jq 'split(",")' | jq -r '.[0]'`
#
echo "SUBNET_ID_1: $SUBNET_ID_1"
echo "SUBNET_ID_2: $SUBNET_ID_2"

docker run \
    -v `pwd`:/src \
    -w /src \
    -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
    -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN \
    -e DATABASE_USER=$DATABASE_USER \
    -e DATABASE_URL=$DATABASE_URL \
    -e DATABASE_DB=$DATABASE_DB \
    -e DATABASE_PASSWORD=$DB_PASSWORD \
    -e SEC_GROUP_1=$SEC_GROUP_1 \
    -e SEC_GROUP_2=$SEC_GROUP_2 \
    -e SUBNET_ID_1=$SUBNET_ID_1 \
    -e SUBNET_ID_2=$SUBNET_ID_2 \
    -e ACC_ID=$AWS_ACC_ID \
    -e AWS_REGION=$AWS_REGION \
    -e STAGE=$STAGE \
    -e TWILIO_SID=$TWILIO_SID \
    -e TWILIO_TOKEN=$TWILIO_TOKEN \
    -e SLACK_WEBHOOK_URL=$SLACK_WEBHOOK_URL \
    -e ANDROID_PA_ARN=$ANDROID_PA_ARN \
    -e IOS_PA_ARN=$IOS_PA_ARN \
    -e IOS_SBX_PA_ARN=$IOS_SBX_PA_ARN \
    -e FACEBOOK_APP_ID=$FACEBOOK_APP_ID \
    -e FACEBOOK_APP_SECRET=$FACEBOOK_APP_SECRET \
    -e FIREBASE_PROJECT_ID=$FIREBASE_PROJECT_ID \
    -e FIREBASE_CLIENT_EMAIL=$FIREBASE_CLIENT_EMAIL \
    -e "FIREBASE_PRIVATE_KEY=$FIREBASE_PRIVATE_KEY" \
    -e FIREBASE_DATABASE_URL=$FIREBASE_DATABASE_URL \
    -e "ANDROID_IAP_KEY=$ANDROID_IAP_KEY" \
    mhart/alpine-node:10.11.0 npm run deploy-prod

aws s3 --region $AWS_REGION cp config.json s3://packs-config/config.json
