// Simple state management replacement for Vuex store
import itemDataJson from './itemData.json';

class FloatsStore {
  constructor() {
    this.state = {
      signedIn: true, // Always signed in for client-only version
      itemData: itemDataJson,
      priceData: {}, // Empty - pricing functionality removed
      rarityRankings: {
        'Consumer': 1, 
        'Industrial': 2, 
        'Mil-Spec': 3, 
        'Restricted': 4, 
        'Classified': 5, 
        'Covert': 6
      }
    };
  }

  getItemData() {
    return this.state.itemData;
  }

  getRarityRankings() {
    return this.state.rarityRankings;
  }

  getPriceData() {
    return this.state.priceData;
  }

  isSignedIn() {
    return this.state.signedIn;
  }
}

// Create singleton instance
export const store = new FloatsStore();
export default store;