class UsersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addUser({ firstName, lastName, email, age, bio }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, age, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  updateUser(id, { firstName, lastName, email, age, bio }) {
    this.storage[id] = { id, firstName, lastName, email, age, bio };
  }

  deleteUser(id) {
    delete this.storage[id];
  }

  filterUsers(searchQuery) {
    console.log("this.storage", this.storage);
    console.log("line 30, searchQuery", searchQuery);
    return Object.values(this.storage).filter((user) => {
      return Object.entries(user).some(([key, value]) => {
        // return searchQuery[key] && searchQuery[key] === value;
        return (
          searchQuery[key] &&
          searchQuery[key].localeCompare(value, undefined, {
            sensitivity: "accent",
          }) === 0
        );
      });
    });
  }
}

module.exports = new UsersStorage();
