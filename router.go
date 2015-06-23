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
	g.StaticFile("/favicon.ico", "./assets/imgs/appIcon.png")

	g.GET("/:reference/:mode", ctrl.Index)
	g.GET("/app/:reference/:mode", ctrl.App)
	g.GET("/pps", ctrl.Pps)

	fmt.Println("} done.")
}
