package handlers

import (
	"net/http"
	"osbb/backend/db"

	"github.com/go-chi/render"
)

type TenantsListPayload struct {
	Page  int `json:"page"`
	Limit int `json:"limit"`
}

func (p *TenantsListPayload) Bind(r *http.Request) error {
	return nil
}

func TenantsListHandler(w http.ResponseWriter, r *http.Request) {
	payload := &TenantsListPayload{
		Limit: 10,
	}
	// if err := render.Bind(r, payload); err != nil {
	// 	render.JSON(w, r, map[string]string{
	// 		"status": "FAIL",
	// 		"error":  err.Error(),
	// 	})
	// 	return
	// }

	db := db.GetDB()

	rows, err := db.Query("SELECT id, name, account_num, square, tarif FROM tenants LIMIT $1 OFFSET $2", payload.Limit, (payload.Page-1)*payload.Limit)
	if err != nil {
		render.JSON(w, r, map[string]string{
			"status": "FAIL",
			"error":  err.Error(),
		})
		return
	}
	defer rows.Close()

	var tenants []map[string]interface{}
	for rows.Next() {
		var id int
		var name, accountNum string
		var square float32
		var tarif float32

		if err := rows.Scan(&id, &name, &accountNum, &square, &tarif); err != nil {
			render.JSON(w, r, map[string]string{
				"status": "FAIL",
				"error":  err.Error(),
			})
			return
		}

		tenants = append(tenants, map[string]interface{}{
			"id":          id,
			"name":        name,
			"account_num": accountNum,
			"square":      square,
			"tarif":       tarif,
		})
	}
	if err := rows.Err(); err != nil {
		render.JSON(w, r, map[string]string{
			"status": "FAIL",
			"error":  err.Error(),
		})
		return
	}
	render.JSON(w, r, map[string]interface{}{
		"status": "OK",
		"data":   tenants,
	})
}
