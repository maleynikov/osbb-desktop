package main

import (
	"context"
	"osbb/backend"
)

type App struct {
	ctx context.Context
	backend.API
}

func NewApp() *App {
	return &App{
		API: backend.NewAPI(),
	}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	// start the backend API server
	go a.API.StartServer()
}
