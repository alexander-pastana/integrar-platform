package resend

import (
	"github.com/alexander-pastana/integrar-platform/api/internal/config"
	"github.com/resend/resend-go/v2"
)

type Client struct {
	Client            *resend.Client
	From              string
	NotificationEmail string
}

func New(cfg *config.Config) *Client {

	return &Client{
		Client: resend.NewClient(cfg.ResendAPIKey),

		From: cfg.ResendFrom,

		NotificationEmail: cfg.NotificationEmail,
	}
}