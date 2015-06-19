package main

import (
	"fmt"
	"os"
	"strconv"

	"github.com/kjhnns/digiPet/server/common"
)

const APP_VER = "0.0.1 beta"

func main() {
	common.Configuration = common.Settings{AppVer: APP_VER}
	cli()
	bootstrap()
}

func cli() {
	welcome()

	//if more than 2 arguments passed on startup
	if len(os.Args) > 2 {
		fmt.Println("Usage: digiPet [staging||production]")
	}

	//if PORT passed as env-variable, use the port
	common.Configuration.Port = 3000
	if os.Getenv("PORT") != "" {
		port, _ := strconv.ParseInt(os.Getenv("PORT"), 10, 32)
		common.Configuration.Port = int(port)
	}

	common.Configuration.Enviroment = common.DEVELOPMENT
	//if second argument on startup passed
	if len(os.Args) == 2 {
		if os.Args[1] == "staging" {
			common.Configuration.Enviroment = common.STAGING
		}
		if os.Args[1] == "production" {
			common.Configuration.Enviroment = common.PRODUCTION
		}
	}
}

func welcome() {
	fmt.Println("")
	fmt.Println("")
	fmt.Println("Welcome to digiPet")
	fmt.Println("")
	fmt.Println("")
}
