package main

import (
	"fmt"
	ctrl "github.com/kjhnns/digiPet/server/controller"
)

func initRouting() {

	fmt.Println("Initializing Routing {")

	g.Static("/assets", "./assets")
	g.LoadHTMLGlob("templates/**")
	// g.LoadHTMLGlob("templates/view/*")
	g.StaticFile("/favicon.ico", "./assets/favicon.png")

	g.GET("/", ctrl.Index)
	g.GET("/app", ctrl.App)

	fmt.Println("} done.")
}
