FROM node:lts-alpine AS builder

RUN apk add --update \
  bash \
	ca-certificates \
	git

WORKDIR /workspace
COPY . .

RUN yarn install --frozen-lockfile

EXPOSE 3000

CMD bash
