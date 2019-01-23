#!/bin/sh

docker run \
    -v `pwd`:/src \
    -w /src \
    mhart/alpine-node:10.11.0 npm run build
