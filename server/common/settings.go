package common

type Enviroment string

var Configuration Settings

const (
	PRODUCTION  Enviroment = "production"
	DEVELOPMENT Enviroment = "development"
	STAGING     Enviroment = "staging"
)

type Settings struct {
	Enviroment Enviroment
	Port       int
	AppVer     string

	Layout string
}
