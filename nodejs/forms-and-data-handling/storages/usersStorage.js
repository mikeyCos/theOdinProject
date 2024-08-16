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
    console.log(searchQuery);
    return Object.values(this.storage).filter((user) => {
      const userName = `${user.firstName} ${user.lastName}`;
      const { name, email } = searchQuery;
      return (
        (name !== 0 && userName.includes(name)) ||
        (email !== 0 && userName.email === email)
      );
    });
    // Object.values(this.storage).filter((key, value) => {
    //   searchKey = key
    // })
  }
}

module.exports = new UsersStorage();
