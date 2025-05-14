package backend

import (
	"errors"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
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

type Server struct {
	api API
}

func (s *Server) Start() {
	r := chi.NewRouter()

	// middleware
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"wails://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	// health check
	r.Get("/ping", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("pong"))
	})

	// api
	apiRouter := chi.NewRouter()
	apiRouter.Post("/auth/login", func(w http.ResponseWriter, r *http.Request) {
		payload := &LoginPayload{}
		if err := render.Bind(r, payload); err != nil {
			render.JSON(w, r, map[string]string{"message": "FAIL"})
			return
		}
		user, err := s.api.Login(payload.Username)
		if err != nil {
			render.JSON(w, r, map[string]string{"message": "FAIL"})
			return
		}
		render.JSON(w, r, map[string]string{"message": user.Name})
	})
	r.Mount("/api", apiRouter)

	_ = http.ListenAndServe(":3000", r)
}

func NewServer() *Server {
	return &Server{
		api: NewAPI(),
	}
}
