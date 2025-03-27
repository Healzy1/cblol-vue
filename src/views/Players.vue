<template>
  <div class="players-container">
    <h1 class="section-title">Top 10 Jogadores Mais Campeões do CBLOL</h1>

    <div class="controls">
      <div class="search-filter">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Pesquisar jogador..."
          class="search-input"
        />
        <select v-model="sortBy" class="sort-select">
          <option value="wins">Mais Títulos</option>
          <option value="name">A-Z</option>
          <option value="recent">Mais Recentes</option>
        </select>
      </div>
    </div>

    <div class="players-grid">
      <div class="grid-row" v-for="(row, index) in chunkedPlayers" :key="index">
        <div class="row-content">
          <transition-group name="flip-list">
            <div
              v-for="player in row"
              :key="player.name"
              class="player-card"
              @click="togglePlayerDetails(player)"
            >
              <div class="player-header">
                <div class="player-rank">{{ player.rank }}º</div>
                <h2 class="player-name">{{ player.name }}</h2>
                <span class="wins-count"
                  >{{ player.wins }} título{{
                    player.wins > 1 ? "s" : ""
                  }}</span
                >
              </div>

              <div class="player-position">
                Último título: {{ player.position }} - {{ player.team }} ({{
                  player.lastChampionship
                }})
              </div>

              <transition name="slide-down">
                <div
                  v-if="expandedPlayer === player.name"
                  class="player-details"
                >
                  <div class="championships-list">
                    <h3>Conquistas:</h3>
                    <ul>
                      <li
                        v-for="(title, idx) in player.championships"
                        :key="idx"
                      >
                        {{ title }}
                      </li>
                    </ul>
                  </div>
                </div>
              </transition>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayersView",
  data() {
    return {
      searchQuery: "",
      sortBy: "wins",
      expandedPlayer: null,
      players: [
        {
          rank: 1,
          name: "Robo",
          wins: 7,
          position: "Top",
          team: "LOUD",
          championships: [
            "2024 Split 1",
            "2023 Split 2",
            "2023 Split 1",
            "2022 Split 2",
            "2021 Split 1",
            "2019 Split 2",
            "2017 Split 1",
          ],
          lastChampionship: "2024 Split 1",
          lastChampionshipYear: 2024,
          lastChampionshipSplit: 1,
        },
        {
          rank: 2,
          name: "tinowns",
          wins: 6,
          position: "Mid",
          team: "Vivo Keyd",
          championships: [
            "2024 Split 1",
            "2023 Split 2",
            "2023 Split 1",
            "2022 Split 2",
            "2021 Split 1",
            "2014 Split 2",
          ],
          lastChampionship: "2024 Split 1",
          lastChampionshipYear: 2024,
          lastChampionshipSplit: 1,
        },
        {
          rank: 2,
          name: "brTT",
          wins: 6,
          position: "ADC",
          team: "paiN Gaming",
          championships: [
            "2021 Split 1",
            "2019 Split 2",
            "2017 Split 1",
            "2015 Split 2",
            "2014 Split 1",
            "2013 Split 1",
          ],
          lastChampionship: "2021 Split 1",
          lastChampionshipYear: 2021,
          lastChampionshipSplit: 1,
        },
        {
          rank: 3,
          name: "TitaN",
          wins: 5,
          position: "ADC",
          team: "paiN Gaming",
          championships: [
            "2024 Split 2",
            "2022 Split 1",
            "2021 Split 2",
            "2018 Split 2",
            "2018 Split 1",
          ],
          lastChampionship: "2024 Split 2",
          lastChampionshipYear: 2024,
          lastChampionshipSplit: 2,
        },
        {
          rank: 4,
          name: "Croc",
          wins: 4,
          position: "Jungle",
          team: "LOUD",
          championships: [
            "2024 Split 1",
            "2023 Split 2",
            "2023 Split 1",
            "2022 Split 2",
          ],
          lastChampionship: "2024 Split 1",
          lastChampionshipYear: 2024,
          lastChampionshipSplit: 1,
        },
        {
          rank: 4,
          name: "RedBert",
          wins: 4,
          position: "Support",
          team: "LOUD",
          championships: [
            "2024 Split 1",
            "2020 Split 2",
            "2019 Split 1",
            "2017 Split 2",
          ],
          lastChampionship: "2024 Split 1",
          lastChampionshipYear: 2024,
          lastChampionshipSplit: 1,
        },
        {
          rank: 4,
          name: "Ceos",
          wins: 4,
          position: "Support",
          team: "LOUD",
          championships: [
            "2023 Split 2",
            "2023 Split 1",
            "2022 Split 2",
            "2020 Split 1",
          ],
          lastChampionship: "2023 Split 2",
          lastChampionshipYear: 2023,
          lastChampionshipSplit: 2,
        },
        {
          rank: 4,
          name: "micaO",
          wins: 4,
          position: "Mid",
          team: "INTZ",
          championships: [
            "2020 Split 2",
            "2016 Split 2",
            "2016 Split 1",
            "2015 Split 1",
          ],
          lastChampionship: "2020 Split 2",
          lastChampionshipYear: 2020,
          lastChampionshipSplit: 2,
        },
        {
          rank: 4,
          name: "tockers",
          wins: 4,
          position: "Mid",
          team: "INTZ",
          championships: [
            "2017 Split 1",
            "2016 Split 2",
            "2016 Split 1",
            "2015 Split 1",
          ],
          lastChampionship: "2017 Split 1",
          lastChampionshipYear: 2017,
          lastChampionshipSplit: 1,
        },
        {
          rank: 10,
          name: "dyNquedo",
          wins: 3,
          position: "ADC",
          team: "paiN Gaming",
          championships: ["2024 Split 2", "2018 Split 2", "2018 Split 1"],
          lastChampionship: "2024 Split 2",
          lastChampionshipYear: 2024,
          lastChampionshipSplit: 2,
        },
      ],
    };
  },
  computed: {
    filteredPlayers() {
      let players = [...this.players];

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        players = players.filter(
          (player) =>
            player.name.toLowerCase().includes(query) ||
            player.team.toLowerCase().includes(query)
        );
      }

      switch (this.sortBy) {
        case "wins":
          players.sort((a, b) => b.wins - a.wins || a.rank - b.rank);
          break;
        case "name":
          players.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "recent":
          players.sort((a, b) => {
            if (b.lastChampionshipYear !== a.lastChampionshipYear) {
              return b.lastChampionshipYear - a.lastChampionshipYear;
            }
            return b.lastChampionshipSplit - a.lastChampionshipSplit;
          });
          break;
      }

      return players;
    },
    chunkedPlayers() {
      const chunkSize = 3;
      const chunks = [];
      for (let i = 0; i < this.filteredPlayers.length; i += chunkSize) {
        chunks.push(this.filteredPlayers.slice(i, i + chunkSize));
      }
      return chunks;
    },
  },
  methods: {
    togglePlayerDetails(player) {
      this.expandedPlayer =
        this.expandedPlayer === player.name ? null : player.name;
    },
  },
};
</script>

<style scoped>
.players-container {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--primary-color);
  position: relative;
  padding-bottom: 0.5rem;
  font-size: 2.2rem;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 4px;
  background-color: var(--primary-color);
}

.controls {
  margin-bottom: 2.5rem;
  display: flex;
  justify-content: center;
}

.search-filter {
  display: flex;
  gap: 1.5rem;
  width: 100%;
  max-width: 800px;
}

.search-input {
  flex: 1;
  padding: 0.85rem 1.25rem;
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  background-color: var(--card-bg);
  color: var(--text-color);
  font-size: 1.05rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(74, 107, 255, 0.3);
}

.sort-select {
  padding: 0.85rem 1.25rem;
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  background-color: var(--card-bg);
  color: var(--text-color);
  font-size: 1.05rem;
  cursor: pointer;
  min-width: 200px;
}

.players-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem 0;
}

.grid-row {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.row-content {
  display: flex;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  flex-wrap: wrap;
  justify-content: center;
}

.player-card {
  background-color: var(--card-bg);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.12);
  transition: all 0.4s ease;
  cursor: pointer;
  width: calc(33.333% - 1.5rem);
  min-width: 300px;
  margin-bottom: 1rem;
}

.player-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.player-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, #3a4b9b 100%);
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.player-rank {
  font-size: 1.8rem;
  font-weight: 700;
  opacity: 0.8;
}

.player-name {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.wins-count {
  background-color: rgba(255, 255, 255, 0.25);
  padding: 0.35rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 1rem;
}

.player-position {
  padding: 0.75rem 1.5rem;
  background-color: rgba(74, 107, 255, 0.1);
  color: var(--text-color);
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.5;
}

.player-details {
  padding: 1.5rem;
  background-color: var(--card-bg);
}

.championships-list h3 {
  margin-top: 0;
  color: var(--primary-color);
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.championships-list ul {
  padding-left: 1.5rem;
  margin-bottom: 0;
}

.championships-list li {
  margin-bottom: 0.75rem;
  line-height: 1.5;
  font-size: 1.05rem;
}

.flip-list-move {
  transition: transform 0.7s ease;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.4s ease;
  max-height: 500px;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
}

@media (max-width: 1200px) {
  .player-card {
    width: calc(50% - 1rem);
  }
}

@media (max-width: 768px) {
  .player-card {
    width: 100%;
    max-width: 400px;
  }

  .search-filter {
    flex-direction: column;
    gap: 1rem;
  }

  .sort-select {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .players-container {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .player-header {
    padding: 1.25rem;
  }

  .player-name {
    font-size: 1.2rem;
  }

  .player-rank {
    font-size: 1.5rem;
  }
}
</style>
