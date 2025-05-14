package handlers

import (
	"errors"
	"fmt"
	"net/http"
	"osbb/backend/db"
	"osbb/backend/models"

	"github.com/go-chi/render"
)

type LoginPayload struct {
	Username string `json:"username"`
}

func (p *LoginPayload) Bind(r *http.Request) error {
	if p.Username == "" {
		return errors.New("username is required")
	}
	return nil
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	payload := &LoginPayload{}
	if err := render.Bind(r, payload); err != nil {
		render.JSON(w, r, map[string]string{"status": "FAIL"})
		return
	}
	db := db.GetDB()

	var user models.User
	err := db.QueryRow(
		"SELECT id, name, is_admin FROM users WHERE name = ?",
		payload.Username,
	).Scan(&user.ID, &user.Name, &user.IsAdmin)

	if err != nil {
		render.JSON(w, r, map[string]string{"status": "FAIL"})
		return
	}

	res, err := db.Exec("INSERT INTO sessions (user_id) VALUES (?)", user.ID)
	if err != nil {
		render.JSON(w, r, map[string]string{"status": "FAIL"})
		return
	}
	sessionID, _ := res.LastInsertId()

	render.JSON(w, r, map[string]string{
		"ssid": fmt.Sprintf("%v", sessionID),
	})
}
