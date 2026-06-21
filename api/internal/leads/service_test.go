package leads_test

import (
	"errors"
	"strings"
	"testing"

	"github.com/alexander-pastana/integrar-platform/api/internal/leads"
)

type fakeRepository struct {
	createCalled bool
	createError  error
}

func (r *fakeRepository) Create(lead *leads.Lead) error {
	r.createCalled = true
	return r.createError
}

func TestCreateLeadWithoutPrivacyConsent(t *testing.T) {
	repo := &fakeRepository{}
	service := leads.NewService(repo)

	lead := &leads.Lead{
		PrivacyConsent: false,
	}

	err := service.CreateLead(lead)

	if !errors.Is(err, leads.ErrPrivacyConsentRequired) {
		t.Errorf("expected privacy consent error, got %v", err)
	}

	if repo.createCalled {
		t.Error("repository should not be called without privacy consent")
	}

}

func TestCreateLeadWithPrivacyConsent(t *testing.T) {
	repo := &fakeRepository{}
	service := leads.NewService(repo)

	lead := &leads.Lead{
		PrivacyConsent: true,
	}

	err := service.CreateLead(lead)

	if err != nil {
		t.Errorf("expected no error, got %v", err)
	}

	if !repo.createCalled {
		t.Error("repository should be called when privacy consent is provided")
	}
}

func TestCreateLeadWhenRepositoryFails(t *testing.T) {
	repositoryError := errors.New("database unavailable")

	repo := &fakeRepository{
		createError: repositoryError,
	}

	service := leads.NewService(repo)

	lead := &leads.Lead{
		PrivacyConsent: true,
	}

	err := service.CreateLead(lead)

	if err == nil {
		t.Fatal("expected an error, got nil")
	}

	if !strings.Contains(err.Error(), "save lead") {
		t.Errorf("expected save lead error, got %v", err)
	}

	if !errors.Is(err, repositoryError) {
		t.Errorf("expected repository error to be preserved, got %v", err)
	}

	if !repo.createCalled {
		t.Error("repository should be called when privacy consent is provided")
	}
}
