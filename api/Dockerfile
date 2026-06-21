# syntax=docker/dockerfile:1

FROM golang:1.25.6-alpine3.20 AS build

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /bin/api ./cmd/api

FROM alpine:3.25

RUN apk --no-cache add ca-certificates \
	&& addgroup -S api \
	&& adduser -S -G api api

WORKDIR /app

COPY --from=build /bin/api /app/api

USER api
EXPOSE 8080

ENTRYPOINT ["/app/api"]
