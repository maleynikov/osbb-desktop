package handlers

import (
	"fmt"
	"net/http"
	"osbb/backend/db"

	"github.com/go-chi/render"
)

type TenantsCreatePayload struct {
	Name       string `json:"name"`
	AccountNum string `json:"account_num"`
	Square     string `json:"square"`
	Tarif      string `json:"tarif"`
}

func (p *TenantsCreatePayload) Bind(r *http.Request) error {
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
	db := db.GetDB()

	var err error
	res, err := db.Exec("INSERT INTO tenants (name, account_num, square, tarif) VALUES ($1, $2, $3, $4)",
		payload.Name,
		payload.AccountNum,
		payload.Square,
		payload.Tarif,
	)
	if err != nil {
		render.JSON(w, r, map[string]string{
			"status": "FAIL",
			"error":  err.Error(),
		})
		return
	}
	id, _ := res.LastInsertId()

	render.JSON(w, r, map[string]string{
		"status": "OK",
		"data":   fmt.Sprintf("%v", id),
	})
}
