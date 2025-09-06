import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

export default new vuex.Store({
  state: {
    signedIn: true,
    itemData: [],
    priceData: {},
    rarityRankings: {'Consumer': 1, 'Industrial': 2, 'Mil-Spec': 3, 'Restricted': 4, 'Classified': 5, 'Covert': 6}
  },
  mutations: {
    setSignIn: (state, login) => {
      state.signedIn = login;
    },
    setItemData: (state, itemData) => {
      state.itemData = itemData;
    },
    setPriceData: (state, priceData) => {
      state.priceData = priceData;
    }
  }
});
