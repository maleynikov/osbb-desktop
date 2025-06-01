package handlers

import (
	"fmt"
	"net/http"
	"osbb/backend/db"

	"github.com/go-chi/render"
)

type TenantsUpsetPayload struct {
	ID         int     `json:"id"`
	Name       string  `json:"name"`
	AccountNum string  `json:"account_num"`
	Square     float64 `json:"square"`
	Tarif      float64 `json:"tarif"`
	Dept       float64 `json:"dept"`
}

func (p *TenantsUpsetPayload) Bind(r *http.Request) error {
	return nil
}

func TenantsUpsetHandler(w http.ResponseWriter, r *http.Request) {
	payload := &TenantsUpsetPayload{}
	if err := render.Bind(r, payload); err != nil {
		render.JSON(w, r, map[string]string{
			"status": "FAIL",
			"error":  err.Error(),
		})
		return
	}
	db := db.GetDB()

	if payload.ID > 0 {
		_, err := db.Exec("UPDATE tenants SET name=?, account_num=?, square=?, tarif=?, dept=? WHERE id=?",
			payload.Name,
			payload.AccountNum,
			payload.Square,
			payload.Tarif,
			payload.Dept,
			payload.ID,
		)
		if err != nil {
			render.JSON(w, r, map[string]string{
				"status": "FAIL",
				"error":  err.Error(),
			})
			return
		}

		render.JSON(w, r, map[string]any{
			"status": "OK",
		})
		return
	}

	var err error
	res, err := db.Exec("INSERT INTO tenants (name, account_num, square, tarif, dept) VALUES ($1, $2, $3, $4, $5)",
		payload.Name,
		payload.AccountNum,
		payload.Square,
		payload.Tarif,
		payload.Dept,
	)
	if err != nil {
		render.JSON(w, r, map[string]string{
			"status": "FAIL",
			"error":  err.Error(),
		})
		return
	}
	id, _ := res.LastInsertId()

	render.JSON(w, r, map[string]any{
		"status": "OK",
		"data": map[string]string{
			"tid": fmt.Sprintf("%v", id),
		},
	})
}
