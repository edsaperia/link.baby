#!/bin/bash

docker run \
    -v `pwd`:/src \
    -w /src \
    -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
    -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN \
    hashicorp/terraform:light init

docker run \
    -v `pwd`:/src \
    -w /src \
    hashicorp/terraform:light get --update