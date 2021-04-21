const posts = [
  {
    name: 'Top 5 Oldtimer Felgen',
    category: 'Oldtimer Felgen',
    image: '/images/christmas_wheels.jpg',
    content:
      "Some quick example text to build on the card title and make up the bulk of the card's content. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    avatar: 'images/oldtimer3.jpg',
    comments: [
      {
        _id: '6047f6f4d2b5b01887bddb03',
        name: 'Jane Doe',
        text: 'Ein sehr interessanter Beitrag!',
        avatar: '',
        user: '6047f5f45d9bc5184934c586',
        createdAt: '2021-03-09T22:30:12.486+00:00',
        updatedAt: '2021-03-09T22:30:12.486+00:00',
      },
    ],
    
  },
  {
    name: 'Innenausstatung für Oldtimer',
    category: 'Oldtimer Fans',
    image: '/images/salon.jpg',
    content:
      "Some quick example text to build on the card title and make up the bulk of the card's content. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    avatar: 'images/oldtimer3.jpg',
    likes: [
      {
        _id: '604803172313fa1dc5da08bf',
        user: '6047f7c0120b2718f196c1e9',
        likes: 0,
      },
    ],
  },
  {
    name: 'Lenkrad',
    category: 'Oldtimer Fans',
    image: '/images/oldtimer-lenkrad.jpg',
    content:
      "Some quick example text to build on the card title and make up the bulk of the card's content. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    avatar: 'images/oldtimer3.jpg',
  },
  {
    name: 'Reise',
    category: 'Reise',
    image: '/images/vintage-car.jpg',
    content:
      "Some quick example text to build on the card title and make up the bulk of the card's content. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    avatar: 'images/oldtimer3.jpg',
    likes: [
      {
        _id: '6048031a2313fa1dc5da08c0',
        user: '6047f7c0120b2718f196c1e9',
        likes: 0,
      },
      {
        _id: '6048032d2313fa1dc5da08c1',
        user: '6047f7c0120b2718f196c1e8',
        likes: 1,
      },
    ],
  },
  {
    name: 'Mein Jaguar',
    category: 'Oldtimer Fans',
    image: '/images/jaguar.jpg',
    content:
      "Some quick example text to build on the card title and make up the bulk of the card's content. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    avatar: 'images/oldtimer3.jpg',
    likes: [
      {
        _id: '604803302313fa1dc5da08c2',
        user: '6047f7c0120b2718f196c1e8',
        likes: 0,
      },
      {
        _id: '604803612313fa1dc5da08c3',
        user: '6047f7c0120b2718f196c1e7',
        likes: 1,
      },
    ],
  },
  {
    name: 'RH für Merzedes',
    category: 'Oldtimer Felgen',
    image: '/images/rh_xmas.jpg',
    content:
      "Some quick example text to build on the card title and make up the bulk of the card's content. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    avatar: 'images/oldtimer3.jpg',
  },
  {
    name: 'Street Mag Show',
    category: 'Events',
    image: '/images/beach.jpg',
    content:
      "Some quick example text to build on the card title and make up the bulk of the card's content. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    avatar: 'images/oldtimer3.jpg',
  },
  {
    name: 'BBS Felgen',
    category: 'Oldtimer Felgen',
    image: '/images/oldtimer3.jpg',
    content:
      "Some quick example text to build on the card title and make up the bulk of the card's content. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    avatar: 'images/oldtimer3.jpg',
  },
]
export default posts
