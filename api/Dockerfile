# syntax=docker/dockerfile:1

FROM golang:1.25-alpine AS build

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 \
    GOOS=linux \
    go build \
    -trimpath \
    -ldflags="-s -w" \
    -o /bin/api \
    ./cmd/api

FROM alpine:3.21

RUN apk add --no-cache ca-certificates \
    && addgroup -S api \
    && adduser -S -G api api

WORKDIR /app

COPY --from=build /bin/api .

USER api

EXPOSE 8080

ENTRYPOINT ["./api"]