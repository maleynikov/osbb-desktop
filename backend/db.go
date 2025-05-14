package backend

import (
	"database/sql"
	"fmt"
	"sync"

	_ "github.com/mattn/go-sqlite3"
)

var (
	_db  *sql.DB
	once sync.Once
)

func getDB() *sql.DB {
	once.Do(func() {
		var err error
		_db, err = sql.Open("sqlite3", "file:osbb.sqlite?cache=shared&mode=rwc")
		if err != nil {
			panic(err)
		}
		migrate()
		fmt.Println("database connected and migrated")
	})
	return _db
}

func migrate() {
	schema := `
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		is_admin BOOLEAN NOT NULL DEFAULT 0,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);
	CREATE TABLE IF NOT EXISTS sessions (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (user_id) REFERENCES users(id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
	);
    CREATE TABLE IF NOT EXISTS tenants (
		id   INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		account_num TEXT UNIQUE NOT NULL,
		square INT NOT NULL,
		tarif REAL NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    `
	if _, err := _db.Exec(schema); err != nil {
		panic(fmt.Sprintf("migration: %v", err))
	}
}
