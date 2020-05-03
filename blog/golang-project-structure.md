---
title: Modular golang project structure
date: 14 April 2019
excerpt: I will describe the  structure for a project that I am using
coverImage: https://media3.giphy.com/media/dJxcyF2CRY9nsM2LlL/giphy.gif
---

### Motivation

![Golang logo](./images/golang-logo.png)

Go language combines both simplicity and freedom in code structure. As someone coming from Java/C# world, it is hard to get used to unopinionated structure of go project.

Today I will share the project stucture that I am using for most of my projects. This structure combines both the business logic and layers of the software. For example, you might have a ```database``` or ```task``` service. It will be specific to your use case, but the general framework is quite clear.

My typical go project looks like this:

```
config
models
interfaces
repository
usecase
api
integration_test
main.go
config.yaml
```

I read some awesome blogs to come up with this structure like [This](https://github.com/golang-standards/project-layout) and [This](https://medium.com/@eminetto/clean-architecture-using-golang-b63587aa5e3f). The best part about this is you can adjust the project structure to your needs and goals. My initial goals were the following:
- Make testable structure
- Use dependency injection as much as possible
- Swap components at ease
- Make components loosely coupled

Okay let`s start with each of the components.

## Naming

When it comes to naming, I prefer to use the business logic naming. For example, I might have ```Companies``` and ```Projects``` and ```Virtual Machines```, then I would have separate files for describe the logic of those entities named after them.

## Config

Configuration module loads all the nessesary config for the application to function. I personally prefer yaml for all my configs, because it has advanced types like arrays and it works perfectly when the configuration grows and needs multiple sections.

My typical configuration looks like this:

```go
type AppConfiguration struct{
    Server struct {
		Port    string `yaml:"port"`
		Origin  string `yaml:"origin"`
    } `yaml:"server"`
    Mongo struct {
		URL   string `yaml:"url"`
		DB    string `yaml:"db"`
		Tasks string `yaml:"tasks"`
	} `yaml:"mongo"`
}
```
You can extend this configuration pretty easily by adding anonymous structs to it.
When it comes to loading the configuration, I am using ```viper``` package, which easily parses yaml and many more formats.

## Logging
For logging I am using [Logrus](https://github.com/sirupsen/logrus) package, which can be easily extended with custom hooks. 

## Models

The contents of the models should only be related to storing the information and declaring all the needed structs. Occasionally, I might have methods on structs to perform really simple calculations. Again, to make sure, it is easy to understand what is going on in the project just by looking at filenames, correlate filenames with business logic entities, like tasks, projects, notes etc.

## Interfaces
As I outlined my primary goal for such structure was testability and therefore, I am highly utilising the ```intefaces```. Here I declare two types of interfaces - Repository and Usecase. The difference between them is hard to formalise, but this is the general idea: you put everything into ```Repository``` if it is a fundamental operation with other layers of the system, like database. You put your custom business logic into the ```Usecase```. Your custom business logic, should rather call repository functions than declare its own.

The reason it is a good idea to sepate Repository from Usecase, is pretty simple - organization. When you have 10-20 functions in one struct, it becomes unclear which function does what, how other parts of the system should interact with this object etc. By keeping it simple and loosely coupled, you make your system much more testable and easier to extend.

When testing the project, interfaces become essential, because now you can mock their implementation using [Mockery](https://github.com/vektra/mockery). Mockery is an awesome CLI tool, that you can use to easily generate stub implementations for the interface. When you update the interface with new methods, you can just run the tool again and it will add missing/changed methods.

Finally, this is an example of interface with repository and usecase:

```go
type ICompanyRepository interface{
    Create(company *model.Company) error
    Edit(company *model.Company) error
}
type ICompanyUsecase interface{
    Register(register *model.CompanyRegister) error
    AddUser(addUser *model.CompanyAddUser) error
}
```

You should also abstract your infrastructure access, like database or filesystem.

## Repository

This package contains the implementation for all the repositories from interfaces. This is where the power of dependency injection comes in. I will show how to setup DI in ```main.go``` file. But for now, all you need to do is:

```go
type CompanyRepository struct {
    config.BaseObject
    dbRepository interfaces.IDBRepository
}

func NewCompanyRepository(
    appConfig *config.AppConfiguration,
	logger *logrus.Logger,
	dbRepository interfaces.IDBRepository,
) interfaces.ICompanyRepository{
    return &CompanyRepository{
        BaseObject: config.BaseObject{
            Config: appConfig,
            Logger: logger,
        },
        dbRepository:     dbRepository,
    }
}
```

I am using ```config.BaseObject``` as embedded struct, to simplify access to global configuration and logging for all structs. Next you declare the interface object.

The most important part is to make a public function which essentially constructs our object. As you can see, at no point we tell anywhere to use concrete implementation of database, we just tell that we need an instance of database interface. 

When writing the methods you can take advantage of interfaces and only access the public methods, which makes your code more readable.


## Deployment

These are some notes that are useful when deploying such project to production:

1. It is better to use configuration managers, like [Vault](https://www.vaultproject.io/), which has awesome UI and version history for all your configs, you can then configure your application to use the Vault API (which is written in Go) to load the Vault config instead of the local one. That way you can keep your private configs out of source control and do not bother with environment variables injection at runtime.
2. For logging, I am using [ELK stack](https://www.elastic.co/what-is/elk-stack), which can be easily hooked up with logrus to log errors, infos and other information directly to Kibana. It then becomes an ease to track what is going on in the application.