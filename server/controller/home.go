package app

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

var g *gin.Engine

func App(c *gin.Context) {

	c.HTML(http.StatusOK, "appRoot.html", gin.H{
		"title": "iCalculator",
	})
}

func Index(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{
		"title": "iCalculator",
	})
}
