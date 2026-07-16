package leads

import (
	"context"
	"errors"
	"fmt"
)

type LeadService interface {
	CreateLead(lead *Lead) error
}

type Service struct {
	repository   LeadRepository
	integrations []LeadIntegration
}

var ErrPrivacyConsentRequired = errors.New("privacy consent is required")

func NewService(
	repo LeadRepository,
	integrations ...LeadIntegration,
) *Service {

	return &Service{
		repository:   repo,
		integrations: integrations,
	}
}

func (s *Service) CreateLead(lead *Lead) error {

	if !lead.PrivacyConsent {
		return ErrPrivacyConsentRequired
	}

	if err := s.repository.Create(lead); err != nil {
		return fmt.Errorf("save lead: %w", err)
	}

	for _, integration := range s.integrations {

		if integration == nil {
			continue
		}

		if err := integration.SyncLead(context.Background(), lead); err != nil {
			fmt.Printf("integration failed: %v\n", err)
		}
	}

	return nil
}
