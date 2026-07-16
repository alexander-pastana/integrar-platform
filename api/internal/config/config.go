package config

import (
	"errors"
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

type Config struct {
	Port string

	DatabaseURL string

	GoogleSheetsID          string
	GoogleServiceAccountPath string

	ResendAPIKey    string
	ResendFrom      string
	NotificationEmail string

	FrontendURL string
}

func Load() (*Config, error) {

	if err := godotenv.Load(); err != nil {
		log.Println(".env file not found, using system environment variables")
	}

	cfg := &Config{
		Port:                     getEnv("PORT", "8080"),
		DatabaseURL:              requiredEnv("DATABASE_URL"),
		GoogleSheetsID:           requiredEnv("GOOGLE_SHEETS_ID"),
		GoogleServiceAccountPath: requiredEnv("GOOGLE_SERVICE_ACCOUNT_PATH"),
		ResendAPIKey:             requiredEnv("RESEND_API_KEY"),
		ResendFrom:               getEnv("RESEND_FROM", "Integrar <onboarding@resend.dev>"),
		NotificationEmail:        requiredEnv("NOTIFICATION_EMAIL"),
		FrontendURL:              getEnv("FRONTEND_URL", "http://localhost:5173"),
	}

	if cfg.DatabaseURL == "" {
		return nil, errors.New("database_url is required")
	}

	return cfg, nil
}

func getEnv(key, fallback string) string {
	value := strings.TrimSpace(os.Getenv(key))
	if value == "" {
		return fallback
	}
	return value
}

func requiredEnv(key string) string {
	return strings.TrimSpace(os.Getenv(key))
}