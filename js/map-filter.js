const getFilteredAds = (ads, typeHouses) => {
  let filteredAds = ads;
  if (typeHouses) {
    filteredAds = ads.filter(ad => ad.offer.type.includes(typeHouses));
  }
  return filteredAds;
}

export { getFilteredAds }
