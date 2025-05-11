package backend

type API struct{}

func (a *API) Hello(name string) string {
	return "Salut, " + name + "!"
}

type User struct {
	ID   int
	Name string
}

func (a *API) GetUser(id int) User {
	return User{ID: id, Name: "Maxime"}
}
