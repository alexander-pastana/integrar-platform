package config

import (
	"errors"
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

// Config centraliza as variáveis de ambiente da aplicação.
type Config struct {
	Port        string
	DatabaseURL string
}

// Load carrega as configurações do arquivo .env ou do sistema.
// Retorna um ponteiro (*Config) seguindo o padrão idiomático para structs de configuração.
func Load() (*Config, error) {
	// O erro do godotenv pode ser ignorado em ambientes de produção (Render/GCP)
	if err := godotenv.Load(); err != nil {
		log.Println(".env file not found, using system environment variables")
	}

	port := strings.TrimSpace(os.Getenv("PORT"))
	if port == "" {
		port = "8080"
	}

	databaseURL := strings.TrimSpace(os.Getenv("DATABASE_URL"))
	if databaseURL == "" {
		// Convenção do Go: mensagens de erro em letras minúsculas e sem ponto final
		return nil, errors.New("database_url is required")
	}

	return &Config{
		Port:        port,
		DatabaseURL: databaseURL,
	}, nil
}