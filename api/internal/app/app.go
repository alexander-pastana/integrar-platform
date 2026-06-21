package app

import (
	"github.com/alexander-pastana/integrar-platform/api/internal/config"
	"github.com/alexander-pastana/integrar-platform/api/internal/leads"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func Setup(cfg *config.Config, db *gorm.DB) *fiber.App {
	app := fiber.New()

	_ = cfg
	repo := leads.NewRepository(db)
	service := leads.NewService(repo)
	handler := leads.NewHandler(service)

	app.Post("/api/v1/leads", handler.CreateLead)

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status": "ok",
		})
	})

	return app
}
