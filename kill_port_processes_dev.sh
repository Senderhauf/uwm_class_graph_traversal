#!/bin/bash

echo "killing server processes at ports 3000/tcp and 3033/tcp"

fuser -k 3033/tcp
fuser -k 3000/tcp