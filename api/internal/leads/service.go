package leads

import (
	"errors"
	"fmt"
)

type LeadService interface {
	CreateLead(lead *Lead) error
}

type Service struct {
	repository LeadRepository
}

var ErrPrivacyConsentRequired = errors.New("privacy consent is required")

func NewService(repo LeadRepository) *Service {
	return &Service{
		repository: repo,
	}
}

func (s *Service) CreateLead(lead *Lead) error {

	if !lead.PrivacyConsent {
		return ErrPrivacyConsentRequired
	}

	if err := s.repository.Create(lead); err != nil {
		return fmt.Errorf("save lead: %w", err)
	}

	return nil
}
