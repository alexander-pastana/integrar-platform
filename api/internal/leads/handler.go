package leads

import (
	"errors"

	"github.com/alexander-pastana/integrar-platform/api/internal/validation"
	"github.com/gofiber/fiber/v2"
)

type Handler struct {
	service LeadService
}

func NewHandler(service LeadService) *Handler {
	return &Handler{
		service: service,
	}
}

func (h *Handler) CreateLead(c *fiber.Ctx) error {
	var leadReq CreateLeadRequest

	if err := c.BodyParser(&leadReq); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid request body",
		})
	}

	if validationError := validation.Validate(leadReq); validationError != nil {
		return c.Status(fiber.StatusBadRequest).JSON(validationError)
	}

	lead := &Lead{
		Name:           leadReq.Name,
		Whatsapp:       leadReq.Whatsapp,
		Age:            leadReq.Age,
		Message:        leadReq.Message,
		PrivacyConsent: *leadReq.PrivacyConsent,
	}

	if err := h.service.CreateLead(lead); err != nil {
		if errors.Is(err, ErrPrivacyConsentRequired) {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": err.Error(),
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "failed to create lead",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "lead created successfully",
	})
}
