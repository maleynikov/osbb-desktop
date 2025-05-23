package handlers

import (
	"net/http"
	"osbb/backend/db"
	"osbb/backend/utils"
	"strconv"
	"time"

	"github.com/go-chi/render"
)

func PaymentsListHandler(w http.ResponseWriter, r *http.Request) {
	db := db.GetDB()

	l, _ := strconv.Atoi(utils.QueryParamOrDefault(r, "limit", "10"))
	p, _ := strconv.Atoi(utils.QueryParamOrDefault(r, "page", "1"))

	rows, err := db.Query(`
		SELECT p.id AS payment_id,
			amount,
			period,
			name AS tenanet_name,
			account_num AS tenant_account,
			p.created_at AS created_at
		FROM payments p
		INNER JOIN tenants t ON t.id = p.tenant_id
		ORDER BY p.id
		LIMIT $1 OFFSET $2
	`, l, (p-1)*l)

	if err != nil {
		render.JSON(w, r, map[string]string{
			"status": "FAIL",
			"error":  err.Error(),
		})
		return
	}
	defer rows.Close()

	var data []map[string]any
	for rows.Next() {
		var id,
			amount,
			period,
			name,
			account,
			createdAt string

		if err := rows.Scan(&id, &amount, &period, &name, &account, &createdAt); err != nil {
			render.JSON(w, r, map[string]string{
				"status": "FAIL",
				"error":  err.Error(),
			})
			return
		}

		date, _ := time.Parse(time.RFC3339, period)
		data = append(data, map[string]any{
			"id":          id,
			"amount":      amount,
			"period":      date.Format("2006-01"),
			"tenant_name": name,
			"tenant_acc":  account,
			"created_at":  createdAt,
		})
	}

	if err := rows.Err(); err != nil {
		render.JSON(w, r, map[string]string{
			"status": "FAIL",
			"error":  err.Error(),
		})
		return
	}

	render.JSON(w, r, map[string]any{
		"status": "OK",
		"data":   data,
	})
}
