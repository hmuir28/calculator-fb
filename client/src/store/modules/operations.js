import { operationsCollection } from '../../util/Config/firebase.config';

// initial state
const state = () => ({
  operations: [],
});

// actions
const actions = {
  async fetchOperations({ commit, state }) {
    if (state.operations.length) commit('RESET_STATE');

    const operationsDoc = await operationsCollection.doc('operation').get();
    if (!operationsDoc.exists) return;

    const { operations } = await operationsDoc.data();
    commit('SET_OPERATIONS', operations);
  },

  async updateOperations({ commit, state }, operations) {
    commit('SET_OPERATIONS', operations);
    await operationsCollection.doc('operation').set({
      operations: state.operations,
    });
  },

  async resetOperations({ commit }) {
    commit('RESET_STATE');
    await operationsCollection.doc('operation').set({
      operations: [],
    });
  }
}

// mutations
const mutations = {
  RESET_STATE(state) {
    state.operations = [];
  },

  SET_OPERATIONS(state, operations) {
    state.operations = [...state.operations, ...operations];
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
