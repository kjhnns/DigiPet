package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

var g *gin.Engine

func hasBit(n int, pos uint) bool {
	val := n & (1 << pos)
	return (val > 0)
}

func App(c *gin.Context) {
	reference := c.Params.ByName("reference")
	modeStr := c.Params.ByName("mode")
	mode, _ := strconv.ParseUint(modeStr, 10, 8)

	fmt.Println("New Session")
	fmt.Printf("Privacy Policy Statement: \t %t \n", hasBit(int(mode), 1))
	fmt.Printf("Disclosure Request: \t\t %t \n", hasBit(int(mode), 0))

	c.HTML(http.StatusOK, "appRoot.html", gin.H{
		"reference": reference,
		"pps":       hasBit(int(mode), 1), // Privacy Policy Statement
		"dr":        hasBit(int(mode), 0), // Disclosure Request
	})
}

func Index(c *gin.Context) {
	reference := c.Params.ByName("reference")
	mode := c.Params.ByName("mode")

	c.HTML(http.StatusOK, "index.html", gin.H{
		"reference": reference,
		"mode":      mode,
	})
}

func Pps(c *gin.Context) {
	c.HTML(http.StatusOK, "pps.html", gin.H{})
}
