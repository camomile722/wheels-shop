const products = [
  {
    name: 'OZ Mito 17Zoll',
    brand: 'OZ Mito',
    description: 'OZ Mito Felgen 17 Zoll 8j-9j et41 5x112',
    size: 17,
    image: '/images/oz_mito.jpg',
    category: 'Felgen',
    price: 1200,
    countInStock: 4,
    rating: 5,
    numReviews: 2,
    reviews: [
      {
        _id: '6046500d06d2b30ea0007fc4',
        name: 'Jane Doe',
        rating: 5,
        comment: 'SUPER! total zufrieden)',
        user: '60462bb5ecd34008c1123359',
        createdAt: '2021-03-08T16:25:49.737+00:00',
        updatedAt: '2021-03-08T16:25:49.737+00:00',
      },
      {
        _id: '604652a1bc89b70ee3c7ca4f',
        name: 'John Doe',
        rating: 5,
        comment: 'Top Felgen) Danke',
        user: '60462bb5ecd34008c1123358',
        createdAt: '2021-03-08T16:36:49.828+00:00',
        updatedAt: '2021-03-08T16:36:49.828+00:00',
      },
    ],
  },
  {
    name: 'RH ZW1 17 Zoll',
    brand: 'RH',
    description:
      'Zweiteilige RH ZW1 Felgen mit folgenden Parametrn: 5x112, 8j, et48, 17 Zoll',
    size: 17,
    image: '/images/rh_zw1_2.jpg',
    category: 'Felgen',
    price: 1300,
    countInStock: 1,
    rating: 4.5,
    numReviews: 2,
    reviews: [
      {
        _id: '6046500d06d2b30ea0007fc4',
        name: 'Jane Doe',
        rating: 4,
        comment: 'Tolle Felgen! Ich bin total zufrieden)',
        user: '60462bb5ecd34008c1123359',
        createdAt: '2021-03-08T16:25:49.737+00:00',
        updatedAt: '2021-03-08T16:25:49.737+00:00',
      },
      {
        id: '604652a1bc89b70ee3c7ca4f',
        name: 'John Doe',
        rating: 5,
        comment: 'Schnelle Lieferung, tolle Felgen)',
        user: '60462bb5ecd34008c1123358',
        createdAt: '2021-03-08T16:36:49.828+00:00',
        updatedAt: '2021-03-08T16:36:49.828+00:00',
      },
    ],
  },
  {
    name: 'Ronal RSK2 Lorinser',
    brand: 'Ronal Lorinser',
    description: 'Ronal RSK2 Lorinser Felgen 19 Zoll',
    size: 19,
    image: '/images/lorinser_rsk2.jpg',
    category: 'Felgen',
    price: 1300,
    countInStock: 1,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'RH ZW1 17 Zoll',
    brand: 'RH',
    description: 'RH Felgen 8j et60 17 Zoll 5x112',
    size: 17,
    image: '/images/rh_zw1.jpg',
    category: 'Felgen',
    price: 1300,
    countInStock: 1,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'BBS RC 090 17 Zoll',
    brand: 'BBS',
    description:
      'Zweiteilige BBS RC 090 Felgen mit folgenden Parametrn: 8j et20 17 Zoll 5x120',
    size: 17,
    image: '/images/bbs_rc_035.jpg',
    category: 'Felgen',
    price: 1300,
    countInStock: 1,
    rating: 0,
    numReviews: 0,
  },
]
export default products
