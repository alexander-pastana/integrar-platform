package resend

import (
	"context"
	"fmt"

	"github.com/alexander-pastana/integrar-platform/api/internal/leads"
	"github.com/resend/resend-go/v2"
)

func (c *Client) SyncLead(ctx context.Context, lead *leads.Lead) error {

	params := &resend.SendEmailRequest{
		From: c.From,

		To: []string{
			c.NotificationEmail,
		},
		Subject: "Novo interessado no Integrar",
		Html: fmt.Sprintf(`
<h2>Novo interessado</h2>

<p><strong>Nome:</strong> %s</p>

<p><strong>WhatsApp:</strong> %s</p>

<p><strong>Idade:</strong> %d</p>

<p><strong>Mensagem:</strong></p>

<p>%s</p>
`,
			lead.Name,
			lead.Whatsapp,
			lead.Age,
			lead.Message,
		),
	}

	_, err := c.Client.Emails.Send(params)

	return err
}
