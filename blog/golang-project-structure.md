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
controllers
models
middleware
repository
service
main.go
```