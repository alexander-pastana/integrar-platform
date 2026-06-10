package database

import (
	"fmt"

	"github.com/alexander-pastana/integrar-platform/api/internal/config"
	"github.com/alexander-pastana/integrar-platform/api/internal/leads"
	"gorm.io/gorm"

	"gorm.io/driver/postgres"
)

func Connect(cfg *config.Config) (*gorm.DB, error) {

	db, err := gorm.Open(postgres.Open(cfg.DatabaseURL), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("connect database: %w", err)
	}

	if err := db.AutoMigrate(&leads.Lead{}); err != nil {
		return nil, fmt.Errorf("migrate lead table: %w", err)
	}

	return db, nil
}
