package models

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	TenantID int
	Tenant   Tenant    `gorm:"foreignKey:TenantID;references:ID"`
	Amount   float32   `gorm:"type:decimal(10,2)"`
	Period   time.Time `gorm:"type:date"`
}
