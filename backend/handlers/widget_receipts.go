package handlers

import (
	"net/http"
	"osbb/backend/types"

	"github.com/go-chi/render"
)

type ReceiptsPayload struct {
	Ids  []int      `json:"ids"`
	Date types.Date `json:"dt"`
}

func (p *ReceiptsPayload) Bind(r *http.Request) error {
	return nil
}

func WidgetReceiptsHandler(w http.ResponseWriter, r *http.Request) {
	payload := &ReceiptsPayload{}
	if err := render.Bind(r, payload); err != nil {
		render.JSON(w, r, map[string]string{
			"status": "FAIL",
			"error":  err.Error(),
		})
		return
	}
	// db := db.GetDB()
	// var data []map[string]any

	render.JSON(w, r, map[string]any{
		"status": "OK",
		"data":   []map[string]any{},
	})
}
