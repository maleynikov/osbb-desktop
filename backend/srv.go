package backend

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

type Server struct {
	ctx context.Context
}

func (s *Server) Start() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Get("/api/hello", func(w http.ResponseWriter, r *http.Request) {
		name := r.URL.Query().Get("name")
		if name == "" {
			name = "гость"
		}
		resp := map[string]string{"message": "Salut, " + name + "!"}
		json.NewEncoder(w).Encode(resp)
	})
	http.ListenAndServe(":3000", r)
}

func NewServer(ctx context.Context) *Server {
	return &Server{
		ctx: ctx,
	}
}
