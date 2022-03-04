const dataVuexModule = {
  state: {
    players: [],
  },

  mutations: {
    setPlayers: (state, players) => (state.players = players),
    setPlayer: (state, data) => (state.players[data.index] = data.name),
  },

  getters: {
    getPlayers: (state) => state.players,
    getPlayer: (state, index) => state.players[index],
  },
};

export default dataVuexModule;
