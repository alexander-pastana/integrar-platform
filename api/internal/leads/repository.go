package leads

import (
	"gorm.io/gorm"
)

type LeadRepository interface {
	Create(lead *Lead) error
}

type Repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{
		db: db,
	}
}

func (r *Repository) Create(lead *Lead) error {
	return r.db.Create(lead).Error
}
