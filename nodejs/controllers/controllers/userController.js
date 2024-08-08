class CustomNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = "NotFoundError";
  }
}

const userController = {
  getUserById: async (req, res) => {
    const userId = req.params.id;
    const user = await someDBQueryToGetUser(userId);

    if (!user) {
      // res.status(404).send("User not found!");
      // return;
      throw new CustomNotFoundError("User not found");
    }

    res.send(`User found: ${user.name}`);
  },

  getUsers: async (req, res) => {},

  createUser: async (req, res) => {},
};

export default userController;
