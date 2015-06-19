package app

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

var g *gin.Engine

func Home(c *gin.Context) {

	c.HTML(http.StatusOK, "root.html", gin.H{
		"title": "iCalculator",
	})
}
