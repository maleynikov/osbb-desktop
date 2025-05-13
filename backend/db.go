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
    CREATE TABLE IF NOT EXISTS clients (
      id   INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      account_num TEXT UNIQUE NOT NULL,
	  square TEXT NOT NULL,
	  tarif REAL NOT NULL,
	  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    `
	if _, err := _db.Exec(schema); err != nil {
		panic(fmt.Sprintf("migration: %v", err))
	}
}
