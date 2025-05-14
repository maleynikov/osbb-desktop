package backend

import (
	"database/sql"
	"osbb/backend/models"
)

type API struct {
	db *sql.DB
}

func NewAPI() API {
	return API{
		db: getDB(),
	}
}

func (api *API) Login(username string) (*models.User, error) {
	// Check if the user exists
	var user models.User
	err := api.db.QueryRow("SELECT id, name, is_admin FROM users WHERE name = ?", username).Scan(&user.ID, &user.Name, &user.IsAdmin)
	if err != nil {
		return nil, err
	}
	// Create a session for the user
	_, err = api.db.Exec("INSERT INTO sessions (user_id) VALUES (?)", user.ID)
	if err != nil {
		return nil, err
	}
	return &user, nil
}
