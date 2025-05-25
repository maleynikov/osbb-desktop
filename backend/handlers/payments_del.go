package handlers

import (
	"errors"
	"fmt"
	"net/http"
	"osbb/backend/db"
	"strings"

	"github.com/go-chi/render"
)

type PaymentsDelPayload struct {
	Ids []int `json:"ids"`
}

func (p *PaymentsDelPayload) Bind(r *http.Request) error {
	if len(p.Ids) == 0 {
		return errors.New("ids is empty")
	}
	return nil
}

func PaymentsDelHandler(w http.ResponseWriter, r *http.Request) {
	payload := &PaymentsDelPayload{}
	if err := render.Bind(r, payload); err != nil {
		render.JSON(w, r, map[string]string{
			"status": "FAIL",
			"error":  err.Error(),
		})
		return
	}
	ids := make([]string, len(payload.Ids))
	for i, val := range payload.Ids {
		ids[i] = fmt.Sprintf("%v", val)
	}
	db := db.GetDB()
	query := fmt.Sprintf("DELETE FROM payments WHERE id IN (%s)", strings.Join(ids, ","))
	_, err := db.Exec(query)
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
