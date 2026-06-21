package leads_test

import (
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/alexander-pastana/integrar-platform/api/internal/leads"
	"github.com/gofiber/fiber/v2"
)

type fakeService struct {
	createCalled bool
	createError  error
	receivedLead *leads.Lead
}

func (s *fakeService) CreateLead(lead *leads.Lead) error {
	s.createCalled = true
	s.receivedLead = lead
	return s.createError
}

func TestCreateLeadWithInvalidJSON(t *testing.T) {
	service := &fakeService{}
	handler := leads.NewHandler(service)

	app := fiber.New()
	app.Post("/api/v1/leads", handler.CreateLead)

	request := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/leads",
		strings.NewReader(`{"name":"Alexander",}`),
	)

	request.Header.Set("Content-Type", "application/json")

	response, err := app.Test(request)
	if err != nil {
		t.Fatalf("failed to execute request: %v", err)
	}

	if response.StatusCode != fiber.StatusBadRequest {
		t.Errorf(
			"expected status %d, got %d",
			fiber.StatusBadRequest,
			response.StatusCode,
		)
	}

	if service.createCalled {
		t.Error("service should not be called when JSON is invalid")
	}
}

func TestCreateLeadWithoutRequiredField(t *testing.T) {
	service := &fakeService{}
	handler := leads.NewHandler(service)

	app := fiber.New()
	app.Post("/api/v1/leads", handler.CreateLead)

	body := `{
		"whatsapp": "11999999999",
		"age": 25,
		"message": "Tenho interesse",
		"privacyConsent": true
	}`

	request := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/leads",
		strings.NewReader(body),
	)

	request.Header.Set("Content-Type", "application/json")

	response, err := app.Test(request)
	if err != nil {
		t.Fatalf("failed to execute request: %v", err)
	}

	if response.StatusCode != fiber.StatusBadRequest {
		t.Errorf(
			"expected status %d, got %d",
			fiber.StatusBadRequest,
			response.StatusCode,
		)
	}

	if service.createCalled {
		t.Error("service should not be called when required field is missing")
	}
}

func TestCreateLeadWithoutPrivacyConsentHandler(t *testing.T) {
	service := &fakeService{
		createError: leads.ErrPrivacyConsentRequired,
	}

	handler := leads.NewHandler(service)

	app := fiber.New()
	app.Post("/api/v1/leads", handler.CreateLead)

	body := `{
		"name": "Alexander",
		"whatsapp": "11999999999",
		"age": 25,
		"message": "Tenho interesse",
		"privacyConsent": false
	}`

	request := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/leads",
		strings.NewReader(body),
	)

	request.Header.Set("Content-Type", "application/json")

	response, err := app.Test(request)
	if err != nil {
		t.Fatalf("failed to execute request: %v", err)
	}

	if response.StatusCode != fiber.StatusBadRequest {
		t.Errorf(
			"expected status %d, got %d",
			fiber.StatusBadRequest,
			response.StatusCode,
		)
	}

	if !service.createCalled {
		t.Error("service should be called when request data is valid")
	}

	if service.receivedLead == nil {
		t.Fatal("service should receive a lead")
	}

	if service.receivedLead.PrivacyConsent {
		t.Error("expected privacy consent to be false")
	}
}

func TestCreateLeadWhenServiceFails(t *testing.T) {
	service := &fakeService{
		createError: errors.New("database unavailable"),
	}

	handler := leads.NewHandler(service)

	app := fiber.New()
	app.Post("/api/v1/leads", handler.CreateLead)

	body := `{
		"name": "Alexander",
		"whatsapp": "11999999999",
		"age": 25,
		"message": "Tenho interesse",
		"privacyConsent": true
	}`

	request := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/leads",
		strings.NewReader(body),
	)

	request.Header.Set("Content-Type", "application/json")

	response, err := app.Test(request)
	if err != nil {
		t.Fatalf("failed to execute request: %v", err)
	}

	if response.StatusCode != fiber.StatusInternalServerError {
		t.Errorf(
			"expected status %d, got %d",
			fiber.StatusInternalServerError,
			response.StatusCode,
		)
	}

	if !service.createCalled {
		t.Error("service should be called when request data is valid")
	}
}

func TestCreateLeadSuccessfully(t *testing.T) {
	service := &fakeService{}
	handler := leads.NewHandler(service)

	app := fiber.New()
	app.Post("/api/v1/leads", handler.CreateLead)

	body := `{
		"name": "Alexander",
		"whatsapp": "11999999999",
		"age": 25,
		"message": "Tenho interesse",
		"privacyConsent": true
	}`

	request := httptest.NewRequest(
		http.MethodPost,
		"/api/v1/leads",
		strings.NewReader(body),
	)

	request.Header.Set("Content-Type", "application/json")

	response, err := app.Test(request)
	if err != nil {
		t.Fatalf("failed to execute request: %v", err)
	}

	if response.StatusCode != fiber.StatusCreated {
		t.Errorf(
			"expected status %d, got %d",
			fiber.StatusCreated,
			response.StatusCode,
		)
	}

	if !service.createCalled {
		t.Fatal("service should be called")
	}

	if service.receivedLead == nil {
		t.Fatal("service should receive a lead")
	}

	if service.receivedLead.Name != "Alexander" {
		t.Errorf(
			"expected name Alexander, got %s",
			service.receivedLead.Name,
		)
	}

	if service.receivedLead.Whatsapp != "11999999999" {
		t.Errorf(
			"expected whatsapp 11999999999, got %s",
			service.receivedLead.Whatsapp,
		)
	}

	if !service.receivedLead.PrivacyConsent {
		t.Error("expected privacy consent to be true")
	}
}
