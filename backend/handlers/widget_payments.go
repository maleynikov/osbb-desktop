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
			where = append(where, fmt.Sprintf("created_at >= '%v'", fromTime.Format(time.DateTime)))
		}
	}

	to := r.URL.Query().Get("to")
	if to != "" {
		toTime, err := time.Parse(time.DateOnly, to)
		if err == nil {
			where = append(where, fmt.Sprintf("created_at <= '%v 23:59:59'", toTime.Format(time.DateOnly)))
		}
	}

	query := "SELECT SUM(amount) amount, COUNT(*) count FROM payments"
	if len(where) > 0 {
		query += " WHERE 1 "
		for _, val := range where {
			query += fmt.Sprintf("AND %v", val)
		}
	}

	db := db.GetDB()
	var data = struct {
		Amount sql.NullFloat64 `json:"amount"`
		Count  sql.NullInt64   `json:"count"`
	}{}
	err := db.QueryRow(query).Scan(&data.Amount, &data.Count)

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
			"amount": data.Amount.Float64,
			"count":  data.Count.Int64,
		},
	})
}
