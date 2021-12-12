function getSkinMaterials(skin, collection) {
    var materials = [];
    for (var s in collection) {
      if (collection[s].rarityNumber == skin.rarityNumber - 1) materials.push(collection[s]);
    }
    return materials;
  }