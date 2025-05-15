package seeds

import (
	"database/sql"
)

func Users(db *sql.DB) error {
	// Check if record already exists
	var exists bool
	err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE name = 'admin')").Scan(&exists)
	if err != nil {
		return err
	}
	if !exists {
		_, err = db.Exec("INSERT INTO users (name, is_admin) VALUES ('admin', 1)")
		if err != nil {
			return err
		}
	}
	return nil
}
