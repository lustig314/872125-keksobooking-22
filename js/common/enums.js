const MocksConfig = {
  USER: {
    AVATAR: {
      MIN_COUNT: 1,
      MAX_COUNT: 8,
    },
  },

  PLACE: {
    LOCATION: {
      X_COORDINATE: {
        MIN_COUNT: 35.65000,
        MAX_COUNT: 35.70000,
      },
      Y_COORDINATE: {
        MIN_COUNT: 139.70000,
        MAX_COUNT: 139.80000,
      },
    },
  },

  REQUEST: {
    TITLE: {
      OFFER_HEADERS: [
        'Only today!',
        'Sale!!!',
        'Best offer!',
      ],
    },

    ROOMS: {
      ROOMS_COUNT: {
        MIN_COUNT: 1,
        MAX_COUNT: 15,
      },
    },
    GUESTS: {
      GUESTS_COUNT: {
        MIN_COUNT: 2,
        MAX_COUNT: 30,
      },
    },
    CHECK_TIMES: [
      '12:00',
      '13:00',
      '14:00',
    ],
    LIST_FEATURES: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner',
    ],
    DESCRIPTION: [
      'Прекрасное место в центре Токио',
      'Уютное гнездышко в спальном районе',
      'Роскошное жилье с панорамным видом на город',
    ],
    PHOTOS_HOUSES: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
    ],
  },

  SIMILAR_ADS_COUNT: 1,
}

const HomeType = {
  FLAT: 'flat',
  BUNGALOW: 'bungalow',
  HOUSE: 'house',
  PALACE: 'palace',
};

export { MocksConfig, HomeType };
