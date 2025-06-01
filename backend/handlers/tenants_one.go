package handlers

import (
	"net/http"
	"osbb/backend/db"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

func TenantsOneHandler(w http.ResponseWriter, r *http.Request) {
	tid := chi.URLParam(r, "tid")
	val, err := strconv.Atoi(tid)

	if err != nil {
		render.JSON(w, r, map[string]string{
			"status": "FAIL",
			"error":  err.Error(),
		})
		return
	}
	if val == 0 {
		render.JSON(w, r, map[string]string{
			"status": "FAIL",
			"error":  "zero user doesn't exists",
		})
		return
	}

	var data struct {
		ID         int     `json:"id"`
		Name       string  `json:"name"`
		AccountNum string  `json:"account_num"`
		Square     float64 `json:"square"`
		Tarif      float64 `json:"tarif"`
		Dept       float64 `json:"dept"`
	}

	db := db.GetDB()
	err = db.QueryRow(
		"SELECT id, name, account_num, square, tarif, dept FROM tenants WHERE id = ?",
		val,
	).Scan(&data.ID, &data.Name, &data.AccountNum, &data.Square, &data.Tarif, &data.Dept)

	if err != nil {
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
