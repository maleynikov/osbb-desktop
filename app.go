package main

import (
	"context"
	"fmt"
	"osbb/backend"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

// Greet returns a greeting for the given name
func (app *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	// start the backend server
	server := backend.NewServer()
	go server.Start()
	fmt.Println("API server started at :3000")
}
