const caterer = async (Admin, category) => {
  try {
    return Promise.all([
      Admin.create({
        name: "boluwatife",
        email: "fakoredebolu@yahoo.com",
        password: "fakoo.com",
        phone: "08089333186"
      }),

      category.create({
        name: "spagetti"
      })
    ]).then(([spagetti, boluwatife]) => {
      return Promise.all([spagetti.set(Admin, boluwatife)]);
    });
  } catch (error) {
    return console.log(error);
  }
};

export default caterer;
