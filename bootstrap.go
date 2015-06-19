package main

import (
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/kjhnns/digiPet/server/common"
)

var g *gin.Engine

func bootstrap() {
	fmt.Println("bootstrapping")
	if common.Configuration.Enviroment == common.PRODUCTION {
		gin.SetMode(gin.ReleaseMode)
	}

	// Init Gin-Gonic
	g = gin.Default()
	initRouting()

	// Listen and serve on 0.0.0.0:3000
	g.Run(":" + strconv.Itoa(common.Configuration.Port))
}
