package backend

import (
	"database/sql"
	"fmt"
	"net/http"
	"osbb/backend/db"
)

type Server struct {
	db *sql.DB
}

func (s *Server) Start() error {
	server := http.Server{
		Addr:    fmt.Sprintf(":%d", 3000),
		Handler: s.routes(),
	}
	return server.ListenAndServe()
}

func NewServer() *Server {
	return &Server{
		db: db.GetDB(),
	}
}
