export default {
  meals: [
    {
      id: 1,
      name: "Fried Rice",
      size: "Medium",
      price: "450"
    },
    {
      id: 2,
      name: "Jollof Rice",
      size: "Large",
      price: "550"
    },
    {
      id: 3,
      name: "Beans",
      size: "small",
      price: "150"
    },
    {
      id: 4,
      name: "Eba and Semo",
      size: "Large",
      price: "300"
    }
  ],
  menu: [
    {
      id: 1,
      day: 1550324428434,
      menu: [
        {
          id: "1",
          name: "Fried Rice",
          size: "Medium",
          price: "450"
        },
        {
          id: "2",
          name: "Jollof Rice",
          size: "Large",
          price: "550"
        }
      ]
    }
  ],
  order: [
    {
      id: 1,
      day: 1550324428434,
      userId: 1,
      meals: [
        {
          id: 1,
          name: "Fried Rice",
          size: "Medium",
          price: "450"
        },
        {
          id: 3,
          name: "Beans",
          size: "small",
          price: "150"
        }
      ]
    },
    {
      id: 2,
      day: 1550324428434,
      userId: 1,
      meals: [
        {
          id: "1",
          name: "Fried Rice",
          size: "Medium",
          price: "450"
        },
        {
          id: 4,
          name: "Eba and Semo",
          size: "Large",
          price: "300"
        },
        {
          id: 3,
          name: "Beans",
          size: "small",
          price: "150"
        }
      ]
    }
  ]
};
