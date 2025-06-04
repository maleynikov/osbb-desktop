package handlers

import (
	"database/sql"
	"fmt"
	"net/http"
	"osbb/backend/db"
	"time"

	"github.com/go-chi/render"
)

func WidgetPaymentsHandler(w http.ResponseWriter, r *http.Request) {
	where := []string{}

	from := r.URL.Query().Get("from")
	if from != "" {
		fromTime, err := time.Parse(time.DateOnly, from)
		if err == nil {
			where = append(where, fmt.Sprintf("period >= '%v-01'", fromTime.Format("2006-01")))
		}
	}

	to := r.URL.Query().Get("to")
	if to != "" {
		toTime, err := time.Parse(time.DateOnly, to)
		if err == nil {
			where = append(where, fmt.Sprintf("period <= '%v-02'", toTime.Format("2006-01")))
		}
	}

	query := "SELECT SUM(amount) amount, COUNT(*) count FROM payments"
	if len(where) > 0 {
		query += " WHERE 1 "
		for _, val := range where {
			query += fmt.Sprintf("AND %v", val)
		}
	}

	var amount sql.NullFloat64
	var cnt sql.NullInt64

	db := db.GetDB()
	err := db.QueryRow(query).Scan(&amount, &cnt)

	if err != nil {
		render.JSON(w, r, map[string]any{
			"status": "FAIL",
			"error":  err.Error(),
		})
		return
	}

	render.JSON(w, r, map[string]any{
		"status": "OK",
		"data": map[string]any{
			"amount": amount.Float64,
			"count":  cnt.Int64,
		},
	})
}
