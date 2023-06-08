// Тимчасовий файл до підключення DB

const users = [
  {
    username: "Test",
    email: "q",
    password: "q",
    avatar: {
      uri: "https://www.w3schools.com/w3images/avatar2.png",
    },
    posts: [
      {
        title: "Test title",
        location: {},
        area: "Test area",
        photo: {
          uri: null,
        },
        comments: [],
      },
    ],
  },
];

export default users;
