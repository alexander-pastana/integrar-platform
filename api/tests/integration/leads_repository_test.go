//go:build integration

package integration_test

import (
	"os"
	"testing"

	"github.com/alexander-pastana/integrar-platform/api/internal/leads"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func openTestDatabase(t *testing.T) *gorm.DB {
	t.Helper()

	dsn := os.Getenv("TEST_DATABASE_URL")
	if dsn == "" {
		dsn = "postgres://integrar_test:integrar_test@localhost:5433/integrar_test?sslmode=disable"
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		t.Fatalf("failed to connect to test database: %v", err)
	}

	return db
}

func TestRepositoryCreateLead(t *testing.T) {
	db := openTestDatabase(t)

	if err := db.AutoMigrate(&leads.Lead{}); err != nil {
		t.Fatalf("failed to migrate test database: %v", err)
	}

	if err := db.Exec("TRUNCATE TABLE leads RESTART IDENTITY").Error; err != nil {
		t.Fatalf("failed to clean test database: %v", err)
	}

	t.Cleanup(func() {
		db.Exec("TRUNCATE TABLE leads RESTART IDENTITY")
	})

	repository := leads.NewRepository(db)

	lead := &leads.Lead{
		Name:           "Alexander",
		Whatsapp:       "11999999999",
		Age:            25,
		Message:        "Teste de integração",
		PrivacyConsent: true,
	}

	if err := repository.Create(lead); err != nil {
		t.Fatalf("failed to create lead: %v", err)
	}

	if lead.ID == 0 {
		t.Error("expected database to generate lead ID")
	}

	if lead.CreatedAt.IsZero() {
		t.Error("expected database to generate CreatedAt")
	}

	var savedLead leads.Lead

	if err := db.First(&savedLead, lead.ID).Error; err != nil {
		t.Fatalf("failed to find saved lead: %v", err)
	}

	if savedLead.Name != lead.Name {
		t.Errorf("expected name %q, got %q", lead.Name, savedLead.Name)
	}

	if savedLead.Whatsapp != lead.Whatsapp {
		t.Errorf(
			"expected whatsapp %q, got %q",
			lead.Whatsapp,
			savedLead.Whatsapp,
		)
	}
}
