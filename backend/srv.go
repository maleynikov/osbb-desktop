package backend

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	if name == "" {
		name = "гость"
	}
	resp := map[string]string{"message": "Salut, " + name + "!"}
	json.NewEncoder(w).Encode(resp)
}

func StartHTTPServer() {
	fmt.Println("Starting HTTP server on :8080")

	http.HandleFunc("/api/hello", helloHandler)
	go http.ListenAndServe(":8080", nil)
}
