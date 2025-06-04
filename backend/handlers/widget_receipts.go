package handlers

import (
	"fmt"
	"net/http"
	"osbb/backend/db"
	"osbb/backend/types"
	"strings"

	"github.com/go-chi/render"
)

type Receipt struct {
	ID      string  `json:"id"`
	Name    string  `json:"name"`
	AccNum  string  `json:"accNum"`
	Square  float64 `json:"square"`
	Tarif   float64 `json:"tarif"`
	Dept    float64 `json:"dept"`
	Accrued float64 `json:"accrued"`
	Paid    float64 `json:"paid"`
	Total   float64 `json:"total"`
}

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

	placeholders := make([]string, len(payload.Ids))
	args := make([]any, len(payload.Ids)+1)
	args[0] = fmt.Sprintf("%v-01", payload.Date.Format("2006-01"))

	for i, id := range payload.Ids {
		placeholders[i] = "?"
		args[i+1] = id
	}

	query := fmt.Sprintf(`
		SELECT
			t.id,
			t.name,
			t.account_num,
			t.square,
			t.tarif,
			t.dept,
			ROUND(t.tarif * t.square, 2) accrued,
			COALESCE(SUM(p.amount), 0) paid,
			ROUND((t.dept + t.tarif * t.square) - COALESCE(SUM(p.amount), 0), 2) total
		FROM tenants t
		LEFT JOIN payments p
			ON p.tenant_id = t.id AND p.period = ?
		WHERE t.id IN (%s)
		GROUP BY t.id
	`, strings.Join(placeholders, ","))

	db := db.GetDB()
	rows, err := db.Query(query, args...)

	if err != nil {
		render.JSON(w, r, map[string]string{
			"status": "FAIL",
			"error":  err.Error(),
		})
		return
	}
	defer rows.Close()

	var data []Receipt
	for rows.Next() {
		var receipt Receipt
		if err := rows.Scan(
			&receipt.ID,
			&receipt.Name,
			&receipt.AccNum,
			&receipt.Square,
			&receipt.Tarif,
			&receipt.Dept,
			&receipt.Accrued,
			&receipt.Paid,
			&receipt.Total,
		); err != nil {
			render.JSON(w, r, map[string]string{
				"status": "FAIL",
				"error":  err.Error(),
			})
			return
		}
		data = append(data, receipt)
	}

	render.JSON(w, r, map[string]any{
		"status": "OK",
		"data":   data,
	})
}
