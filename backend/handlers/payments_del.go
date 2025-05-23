package handlers

import (
	"net/http"

	"github.com/go-chi/render"
)

func PaymentsDelHandler(w http.ResponseWriter, r *http.Request) {
	page := r.URL.Query().Get("page")
	if page == "" {
		render.JSON(w, r, map[string]any{
			"status": "FAIL",
			"error":  "empty page",
		})
	}
	render.JSON(w, r, map[string]any{
		"status": "OK",
	})
}
