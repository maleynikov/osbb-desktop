package backend

import (
	"fmt"
	"os"
)

type API struct {
	srv *Server
}

func (api *API) StartServer() {
	fmt.Println("starting API server ...")
	if err := api.srv.Start(); err != nil {
		fmt.Fprintf(os.Stderr, "API server error %v", err)
		os.Exit(1)
	}
}

func NewAPI() API {
	return API{
		srv: NewServer(),
	}
}
