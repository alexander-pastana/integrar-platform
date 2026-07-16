package google

import (
	"context"
	"os"

	"google.golang.org/api/option"
	"google.golang.org/api/sheets/v4"
)

type Client struct {
	Service *sheets.Service
	SheetID string
}

func New() (*Client, error) {
	ctx := context.Background()

	var (
		srv *sheets.Service
		err error
	)

	if json := os.Getenv("GOOGLE_SERVICE_ACCOUNT_JSON"); json != "" {
		srv, err = sheets.NewService(
			ctx,
			option.WithCredentialsJSON([]byte(json)),
		)
	} else {
		srv, err = sheets.NewService(
			ctx,
			option.WithCredentialsFile(os.Getenv("GOOGLE_SERVICE_ACCOUNT_PATH")),
		)
	}

	if err != nil {
		return nil, err
	}

	return &Client{
		Service: srv,
		SheetID: os.Getenv("GOOGLE_SHEETS_ID"),
	}, nil
}