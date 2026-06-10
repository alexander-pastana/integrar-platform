package main

import (
	"log"

	"github.com/alexander-pastana/integrar-platform/api/internal/app"
	"github.com/alexander-pastana/integrar-platform/api/internal/config"
	"github.com/alexander-pastana/integrar-platform/api/internal/database"
)

func main() {

	cfg, err := config.Load()
	if err != nil{
		log.Fatal(err) 
	}

	db, err := database.Connect(cfg)
	if err != nil{
		log.Fatal(err) 
	}

	server := app.Setup(cfg, db)

	if err := server.Listen(":" + cfg.Port); err != nil{
		log.Fatal(err) 
	}

}