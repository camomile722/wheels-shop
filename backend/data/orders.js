const orders = [
  {
    _id: '6048963159b5650ad5663d28',
    shippingPrice: 0,
    totalPrice: 1300,
    isPaid: false,
    isDelivered: false,
    orderItems: {
      _id: '6048963159b5650ad5663d29',
      product: '604895c51615b30ac3c458d5',
      name: 'RH ZW1 17 Zoll',
      image: '/images/rh_zw1_2.jpg',
      price: 1300,
      qty: 1,
    },

    user: '604895c51615b30ac3c458cf',
    shippingAddress: {
      address: 'Öjendorfer Weg, 47',
      city: 'Hamburg',
      postalCode: '22119',
      country: 'Deutschland',
    },

    paymentMethod: 'PayPal',
    createdAt: '2021-03-10T09:49:37.658+00:00',
    updatedAt: '2021-03-10T09:49:37.658+00:00',
  },
  {
    _id: '6048983d07bca90b6ae3fcd1',
    shippingPrice: 0,
    totalPrice: 1300,
    isPaid: true,
    isDelivered: false,
    orderItems: {
      _id: '6048983d07bca90b6ae3fcd2',
      product: '6048972f29a1c70b5d07d084',
      name: 'RH ZW1 17 Zoll',
      image: '/images/rh_zw1_2.jpg',
      price: 1300,
      qty: 1,
    },

    user: '6048972f29a1c70b5d07d07e',
    shippingAddress: {
      address: 'Öjendorfer Weg, 47',
      city: 'Hamburg',
      postalCode: '22119',
      country: 'Deutschland',
    },

    paymentMethod: 'PayPal',
    createdAt: '2021-03-10T09:58:21.948+00:00',
    updatedAt: '2021-03-10T09:59:11.857+00:00',

    paidAt: '2021-03-10T09:59:11.851+00:00',
    paymentResult: {
      id: '05X37941MW543114V',
      status: 'COMPLETED',
      update_time: '2021-03-10T09:59:10Z',
      email_address: 'sb-ciwej5369942@personal.example.com',
    },
  },
]
export default orders
