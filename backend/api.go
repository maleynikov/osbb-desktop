package backend

import (
	"database/sql"
	"osbb/backend/models"
)

type API struct {
	db *sql.DB
}

func NewAPI() *API {
	return &API{
		db: getDB(),
	}
}

func (a *API) Hello(name string) string {
	return "Salut, " + name + "!"
}

func (a *API) GetUser(id int) models.User {
	return models.User{ID: id, Name: "Maxime"}
}

func (a *API) ListUsers() ([]models.User, error) {
	rows, err := a.db.Query("SELECT id, name, email FROM users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var user models.User
		if err := rows.Scan(&user.ID, &user.Name, &user.Email); err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}
	return users, nil
}
