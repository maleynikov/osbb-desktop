package handlers

import (
	"errors"
	"net/http"

	"github.com/go-chi/render"
)

type TenantsCreatePayload struct {
	Name       string  `json:"name"`
	AccountNum string  `json:"account_num"`
	Squere     int     `json:"squere"`
	Tarif      float32 `json:"tarif"`
}

func (p *TenantsCreatePayload) Bind(r *http.Request) error {
	if p.Name == "" {
		return errors.New("name is required")
	}
	if p.AccountNum == "" {
		return errors.New("account_num is required")
	}
	if p.Squere <= 0 {
		return errors.New("squere must be greater than 0")
	}
	if p.Tarif <= 0 {
		return errors.New("tarif must be greater than 0")
	}
	return nil
}

func TenantsCreateHandler(w http.ResponseWriter, r *http.Request) {
	payload := &TenantsCreatePayload{}
	if err := render.Bind(r, payload); err != nil {
		render.JSON(w, r, map[string]string{
			"status": "FAIL",
			"error":  err.Error(),
		})
		return
	}
	render.JSON(w, r, map[string]string{
		"status": "OK",
	})
}
