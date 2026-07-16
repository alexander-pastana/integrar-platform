package google

import (
	"context"
	"strconv"
	"time"

	"github.com/alexander-pastana/integrar-platform/api/internal/leads"
	"google.golang.org/api/sheets/v4"
)

type Service struct {
	client *Client
}

func NewService(client *Client) *Service {
	return &Service{
		client: client,
	}
}

func (s *Service) SyncLead(ctx context.Context, lead *leads.Lead) error {

	values := [][]interface{}{
		{
			time.Now().Format("02/01/2006 15:04"),
			lead.Name,
			lead.Whatsapp,
			strconv.Itoa(lead.Age),
			lead.Message,
			lead.PrivacyConsent,
			"Landing Page",
		},
	}

	vr := &sheets.ValueRange{
		Values: values,
	}

	_, err := s.client.Service.
		Spreadsheets.
		Values.
		Append(
			s.client.SheetID,
			"A1",
			vr,
		).
		ValueInputOption("RAW").
		InsertDataOption("INSERT_ROWS").
		Context(ctx).
		Do()

	return err
}