package models

import (
	"gorm.io/gorm"
)

type Tenant struct {
	gorm.Model
	Name       string
	AccountNum string `gorm:"uniqueIndex"`
	Squere     int
	Tarif      float32 `gorm:"type:decimal(10,2)"`
	Dept       float32 `gorm:"type:decimal(10,2)"`
}
