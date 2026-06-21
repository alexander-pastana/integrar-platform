package leads

type CreateLeadRequest struct {
	Name           string `json:"name" validate:"required"`
	Whatsapp       string `json:"whatsapp" validate:"required"`
	Age            int    `json:"age"`
	Message        string `json:"message"`
	PrivacyConsent *bool  `json:"privacyConsent" validate:"required"`
}
