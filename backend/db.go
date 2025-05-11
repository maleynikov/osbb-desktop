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
		fmt.Println("Database connected and migrated")
	})
	return _db
}

func migrate() {
	schema := `
    CREATE TABLE IF NOT EXISTS users (
      id   INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );
    `
	if _, err := _db.Exec(schema); err != nil {
		panic(fmt.Sprintf("migration: %v", err))
	}
}
