package models

import "time"

type Tenant struct {
	ID         int    `json:"id"`
	Name       string `json:"name"`
	AccountNum string `json:"account_num"`
	Squere     int    `json:"squere"`
	Tarif      float32
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}
