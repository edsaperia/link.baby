#!/bin/bash

docker run \
    -v `pwd`:/src \
    -w /src \
    -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
    -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN \
    -e TF_VAR_ssh_allowed_ip=$MY_IP_ADDRESS \
    -e TF_VAR_acm_arn=$SSL_CERT_ARN \
    -e TF_VAR_key_pair_name=$APP_KP_NAME \
    -e TF_VAR_bastion_key_pair_name=$BASION_KP_NAME \
    -e TF_VAR_db_password=$DB_PASSWORD \
    -e TF_VAR_slack_webhook_url=$SLACK_WEBHOOK_URL \
    -e TF_VAR_github_token=$GITHUB_TOKEN \
    hashicorp/terraform:light plan -var-file=platform.tfvars -var-file=secrets.tfvars
