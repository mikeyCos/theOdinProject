const indexController = {
  getIndex: (req, res) => {
    console.log("getIndex running...");
    res.render("index", { title: "Home" });
  },
};

module.exports = indexController;
