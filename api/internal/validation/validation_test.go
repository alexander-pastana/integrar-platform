package validation_test

import (
	"testing"

	"github.com/alexander-pastana/integrar-platform/api/internal/leads"
	"github.com/alexander-pastana/integrar-platform/api/internal/validation"
)

func boolPointer(value bool) *bool {
	return &value
}

func TestValidateValidCreateLeadRequest(t *testing.T) {
	request := leads.CreateLeadRequest{
		Name:           "Alexander",
		Whatsapp:       "11999999999",
		Age:            25,
		Message:        "Tenho interesse",
		PrivacyConsent: boolPointer(true),
	}

	validationError := validation.Validate(request)

	if validationError != nil {
		t.Errorf("expected no validation error, got %v", validationError)
	}
}

func TestValidateMissingName(t *testing.T) {
	request := leads.CreateLeadRequest{
		Whatsapp:       "11999999999",
		PrivacyConsent: boolPointer(true),
	}

	validationError := validation.Validate(request)

	if validationError == nil {
		t.Fatal("expected a validation error, got nil")
	}

	if validationError.Field != "name" {
		t.Errorf("expected field %q, got %q", "name", validationError.Field)
	}

	if validationError.Tag != "required" {
		t.Errorf("expected tag %q, got %q", "required", validationError.Tag)
	}
}

func TestValidateMissingPrivacyConsent(t *testing.T) {
	request := leads.CreateLeadRequest{
		Name:     "Alexander",
		Whatsapp: "11999999999",
	}

	validationError := validation.Validate(request)

	if validationError == nil {
		t.Fatal("expected a validation error, got nil")
	}

	if validationError.Field != "privacyConsent" {
		t.Errorf(
			"expected field %q, got %q",
			"privacyConsent",
			validationError.Field,
		)
	}
}

func TestValidateAcceptsFalsePrivacyConsentWhenFieldExists(t *testing.T) {
	request := leads.CreateLeadRequest{
		Name:           "Alexander",
		Whatsapp:       "11999999999",
		PrivacyConsent: boolPointer(false),
	}

	validationError := validation.Validate(request)

	if validationError != nil {
		t.Errorf("expected no structural validation error, got %v", validationError)
	}
}
