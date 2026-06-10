package leads

import "time"

type Lead struct {
	ID             uint      `json:"id"`
	Name           string    `json:"name"`
	Whatsapp       string    `json:"whatsapp"`
	Age            int       `json:"age"`
	Message        string    `json:"message"`
	PrivacyConsent bool      `json:"privacyConsent"`
	CreatedAt      time.Time `json:"createdAt"`
}
