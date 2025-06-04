package handlers

import (
	"net/http"
	"osbb/backend/db"
	"osbb/backend/types"

	"github.com/go-chi/render"
)

type PaymentsCreatePayload struct {
	TenantID int        `json:"tenant_id"`
	Amount   float64    `json:"amount"`
	Period   types.Date `json:"period"`
}

func (payload *PaymentsCreatePayload) Bind(r *http.Request) error {
	return nil
}

func PaymentsCreateHandler(w http.ResponseWriter, r *http.Request) {
	payload := &PaymentsCreatePayload{}
	if err := render.Bind(r, payload); err != nil {
		render.JSON(w, r, map[string]string{
			"status": "FAIL",
			"error":  err.Error(),
		})
		return
	}
	db := db.GetDB()

	_, err := db.Exec("INSERT INTO payments (tenant_id, amount, period) VALUES ($1, $2, $3)",
		payload.TenantID,
		payload.Amount,
		payload.Period.Format("2006-01-02"),
	)
	if err != nil {
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
