package config

import (
	"errors"
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

type Config struct {
	Port        string
	DatabaseURL string

	FrontendURL string

	GoogleSheetsID          string
	GoogleServiceAccountJSON string
	GoogleServiceAccountPath string

	ResendAPIKey    string
	ResendFrom      string
	NotificationEmail string
}

func Load() (*Config, error) {

	if err := godotenv.Load(); err != nil {
		log.Println(".env file not found, using system environment variables")
	}

	cfg := &Config{
		Port:        getEnv("PORT", "8080"),
		DatabaseURL: strings.TrimSpace(os.Getenv("DATABASE_URL")),

		FrontendURL: getEnv("FRONTEND_URL", "http://localhost:5173"),

		GoogleSheetsID:           strings.TrimSpace(os.Getenv("GOOGLE_SHEETS_ID")),
		GoogleServiceAccountJSON: strings.TrimSpace(os.Getenv("GOOGLE_SERVICE_ACCOUNT_JSON")),
		GoogleServiceAccountPath: strings.TrimSpace(os.Getenv("GOOGLE_SERVICE_ACCOUNT_PATH")),

		ResendAPIKey:     strings.TrimSpace(os.Getenv("RESEND_API_KEY")),
		ResendFrom:       strings.TrimSpace(os.Getenv("RESEND_FROM")),
		NotificationEmail: strings.TrimSpace(os.Getenv("NOTIFICATION_EMAIL")),
	}

	if cfg.DatabaseURL == "" {
		return nil, errors.New("database_url is required")
	}

	return cfg, nil
}

func getEnv(key, fallback string) string {
	v := strings.TrimSpace(os.Getenv(key))
	if v == "" {
		return fallback
	}
	return v
}