package google

import (
	"context"

	"github.com/alexander-pastana/integrar-platform/api/internal/config"
	"google.golang.org/api/option"
	"google.golang.org/api/sheets/v4"
)

type Client struct {
	Service *sheets.Service
	SheetID string
}

func New(cfg *config.Config) (*Client, error) {

	ctx := context.Background()

	var (
		srv *sheets.Service
		err error
	)

	if cfg.GoogleServiceAccountJSON != "" {

		srv, err = sheets.NewService(
			ctx,
			option.WithCredentialsJSON([]byte(cfg.GoogleServiceAccountJSON)),
		)

	} else {

		srv, err = sheets.NewService(
			ctx,
			option.WithCredentialsFile(cfg.GoogleServiceAccountPath),
		)

	}

	if err != nil {
		return nil, err
	}

	return &Client{
		Service: srv,
		SheetID: cfg.GoogleSheetsID,
	}, nil
}