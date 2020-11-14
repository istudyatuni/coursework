#!/bin/bash
#
ORANGE="\033[0;33m"
NC="\033[0m"

echo -e "${ORANGE}yarn deploy${NC}"
yarn deploy

echo -e "${ORANGE}git fetch origin gh-pages${NC}"
git fetch origin gh-pages
