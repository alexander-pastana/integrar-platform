package app

import (
	"log"

	"github.com/alexander-pastana/integrar-platform/api/internal/config"
	"github.com/alexander-pastana/integrar-platform/api/internal/integrations/google"
	"github.com/alexander-pastana/integrar-platform/api/internal/integrations/resend"
	"github.com/alexander-pastana/integrar-platform/api/internal/leads"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"gorm.io/gorm"
)

func Setup(cfg *config.Config, db *gorm.DB) *fiber.App {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: cfg.FrontendURL,
		AllowMethods: "GET,POST,OPTIONS",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	googleClient, err := google.New(cfg)
	if err != nil {
		log.Fatal(err)
	}

	resendClient := resend.New(cfg)

	googleService := google.NewService(googleClient)

	repo := leads.NewRepository(db)

	service := leads.NewService(
		repo,
		googleService,
		resendClient,
	)

	handler := leads.NewHandler(service)

	app.Post("/api/v1/leads", handler.CreateLead)

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status": "ok",
		})
	})

	return app
}
