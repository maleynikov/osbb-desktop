package middlewares

import (
	"database/sql"
	"net/http"
	"osbb/backend/db"
	"strings"
)

func AuthMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
				http.Error(w, "missing or invalid Authorization header", http.StatusUnauthorized)
				return
			}

			db := db.GetDB()
			token := strings.TrimPrefix(authHeader, "Bearer ")
			var exists string
			err := db.QueryRow("SELECT 1 FROM sessions WHERE session_id = ?", token).Scan(&exists)

			if err != nil {
				if err == sql.ErrNoRows {
					http.Error(w, "invalid token", http.StatusUnauthorized)
					return
				}
				http.Error(w, "internal server error", http.StatusInternalServerError)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}
