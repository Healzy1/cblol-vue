<template>
  <div class="teams-container">
    <h1 class="section-title">Times Campeões do CBLOL</h1>

    <div class="controls">
      <div class="search-filter">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Pesquisar time..."
          class="search-input"
        />
        <select v-model="sortBy" class="sort-select">
          <option value="recent">Mais Recentes</option>
          <option value="oldest">Mais Antigos</option>
          <option value="name">A-Z</option>
          <option value="titles">Mais Títulos</option>
        </select>
      </div>
    </div>

    <div class="champions-grid">
      <div class="grid-row" v-for="(row, index) in chunkedTeams" :key="index">
        <div class="row-content">
          <transition-group name="flip-list">
            <div
              v-for="team in row"
              :key="team.name"
              class="team-card"
              @click="toggleTeamDetails(team)"
            >
              <div class="team-banner">
                <h2 class="team-name">{{ team.name }}</h2>
                <span class="titles-count"
                  >{{ team.titles }} título{{
                    team.titles > 1 ? "s" : ""
                  }}</span
                >
              </div>

              <transition name="slide-down">
                <div
                  v-if="expandedTeam && expandedTeam.name === team.name"
                  class="team-details"
                >
                  <div class="championships-list">
                    <h3>Conquistas:</h3>
                    <ul>
                      <li v-for="(title, idx) in team.championships" :key="idx">
                        {{ title.tournament.replace("Playoffs", "").trim() }}
                        ({{ formatDate(title.start) }})
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
  name: "TeamsView",
  data() {
    return {
      searchQuery: "",
      sortBy: "recent",
      expandedTeam: null,
      championships: [
        {
          start: "2024-08-03",
          tournament: "CBLOL 2024 Split 2 Playoffs",
          first: "paiN Gaming",
        },
        {
          start: "2024-03-22",
          tournament: "CBLOL 2024 Split 1 Playoffs",
          first: "LOUD",
        },
        {
          start: "2023-08-11",
          tournament: "CBLOL 2023 Split 2 Playoffs",
          first: "LOUD",
        },
        {
          start: "2023-03-24",
          tournament: "CBLOL 2023 Split 1 Playoffs",
          first: "LOUD",
        },
        {
          start: "2022-08-12",
          tournament: "CBLOL 2022 Split 2 Playoffs",
          first: "LOUD",
        },
        {
          start: "2022-03-25",
          tournament: "CBLOL 2022 Split 1 Playoffs",
          first: "RED Canids",
        },
        {
          start: "2021-08-07",
          tournament: "CBLOL 2021 Split 2 Playoffs",
          first: "RED Canids",
        },
        {
          start: "2021-03-27",
          tournament: "CBLOL 2021 Split 1 Playoffs",
          first: "paiN Gaming",
        },
        {
          start: "2020-08-22",
          tournament: "CBLOL 2020 Split 2 Playoffs",
          first: "INTZ",
        },
        {
          start: "2020-05-02",
          tournament: "CBLOL 2020 Split 1 Playoffs",
          first: "KaBuM! Esports",
        },
        {
          start: "2019-08-24",
          tournament: "CBLOL 2019 Split 2 Playoffs",
          first: "Flamengo Esports",
        },
        {
          start: "2019-04-06",
          tournament: "CBLOL 2019 Split 1 Playoffs",
          first: "INTZ",
        },
        {
          start: "2018-08-11",
          tournament: "CBLOL 2018 Split 2 Playoffs",
          first: "KaBuM! Esports",
        },
        {
          start: "2018-03-17",
          tournament: "CBLOL 2018 Split 1 Playoffs",
          first: "KaBuM! Esports",
        },
        {
          start: "2017-08-19",
          tournament: "CBLOL 2017 Split 2 Playoffs",
          first: "Team oNe eSports",
        },
        {
          start: "2017-03-25",
          tournament: "CBLOL 2017 Split 1 Playoffs",
          first: "RED Canids",
        },
        {
          start: "2016-06-24",
          tournament: "CBLOL 2016 Split 2 Playoffs",
          first: "INTZ",
        },
        {
          start: "2016-03-12",
          tournament: "CBLOL 2016 Split 1 Playoffs",
          first: "INTZ",
        },
        {
          start: "2015-07-11",
          tournament: "CBLOL 2015 Split 2 Playoffs",
          first: "paiN Gaming",
        },
        {
          start: "2015-03-21",
          tournament: "CBLOL 2015 Split 1 Playoffs",
          first: "INTZ",
        },
        {
          start: "2014-06-07",
          tournament: "CBLOL 2014 Playoffs",
          first: "Keyd Stars",
        },
      ].filter((t) => t.tournament.includes("Playoffs")),
    };
  },
  computed: {
    teamsData() {
      const teamsMap = {};

      this.championships.forEach((champ) => {
        if (!teamsMap[champ.first]) {
          teamsMap[champ.first] = {
            name: champ.first,
            titles: 0,
            championships: [],
          };
        }
        teamsMap[champ.first].titles++;
        teamsMap[champ.first].championships.push({
          tournament: champ.tournament,
          start: champ.start,
        });
      });

      return Object.values(teamsMap);
    },
    filteredTeams() {
      let teams = [...this.teamsData];

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        teams = teams.filter((team) => team.name.toLowerCase().includes(query));
      }

      switch (this.sortBy) {
        case "recent":
          teams.sort((a, b) => {
            const latestA = new Date(
              Math.max(...a.championships.map((c) => new Date(c.start)))
            );
            const latestB = new Date(
              Math.max(...b.championships.map((c) => new Date(c.start)))
            );
            return latestB - latestA;
          });
          break;
        case "oldest":
          teams.sort((a, b) => {
            const earliestA = new Date(
              Math.min(...a.championships.map((c) => new Date(c.start)))
            );
            const earliestB = new Date(
              Math.min(...b.championships.map((c) => new Date(c.start)))
            );
            return earliestA - earliestB;
          });
          break;
        case "name":
          teams.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "titles":
          teams.sort((a, b) => b.titles - a.titles);
          break;
      }

      return teams;
    },
    chunkedTeams() {
      const chunkSize = 3;
      const chunks = [];
      for (let i = 0; i < this.filteredTeams.length; i += chunkSize) {
        chunks.push(this.filteredTeams.slice(i, i + chunkSize));
      }
      return chunks;
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.getFullYear();
    },
    toggleTeamDetails(team) {
      this.expandedTeam = this.expandedTeam?.name === team.name ? null : team;
    },
  },
};
</script>

<style scoped>
.teams-container {
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
  width: 100px;
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

.champions-grid {
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

.team-card {
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

.team-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.team-banner {
  padding: 1.75rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, #3a4b9b 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.team-name {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
}

.titles-count {
  background-color: rgba(255, 255, 255, 0.25);
  padding: 0.35rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 1rem;
}

.team-details {
  padding: 1.75rem;
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
  .team-card {
    width: calc(50% - 1rem);
  }
}

@media (max-width: 768px) {
  .team-card {
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
  .teams-container {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .team-banner {
    padding: 1.25rem;
  }

  .team-name {
    font-size: 1.2rem;
  }
}
</style>
