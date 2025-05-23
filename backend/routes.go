package backend

import (
	"net/http"
	"osbb/backend/handlers"
	"osbb/backend/middlewares"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func (s *Server) routes() http.Handler {
	r := chi.NewRouter()

	// middleware
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"wails://*", "http://*"},
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
	apiRouter.Post("/auth/login", handlers.LoginHandler)

	// protected routes
	apiRouter.Group(func(r chi.Router) {
		r.Use(middlewares.AuthMiddleware())
		r.Get("/tenants", handlers.TenantsListHandler)
		r.Post("/tenants/create", handlers.TenantsCreateHandler)
		r.Delete("/tenants/delete", handlers.TenantsDelHandler)
		r.Get("/payments", handlers.PaymentsListHandler)
		r.Post("/payments", handlers.PaymentsCreateHandler)
		r.Delete("/payments", handlers.PaymentsDelHandler)
	})
	r.Mount("/api", apiRouter)

	return r
}
