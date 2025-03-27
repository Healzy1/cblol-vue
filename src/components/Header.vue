<template>
  <header class="header">
    <div class="container">
      <router-link to="/" class="logo">
        <img src="@/assets/images/cblol-logo.png" alt="CBLOL Logo" />
      </router-link>

      <button class="menu-toggle" @click="toggleMenu" aria-label="Abrir menu">
        <span v-if="!menuOpen">☰</span>
        <span v-else>✕</span>
      </button>

      <nav class="nav" :class="{ active: menuOpen }">
        <router-link
          v-for="route in routes"
          :key="route.path"
          :to="route.path"
          class="nav-link"
          @click="menuOpen = false"
        >
          {{ route.name }}
        </router-link>
      </nav>

      <ThemeToggle
        :isDark="isDark"
        @toggle-theme="$emit('toggle-theme')"
        class="theme-toggle"
      />
    </div>
  </header>
</template>

<script>
import ThemeToggle from "./ThemeToggle.vue";

export default {
  name: "AppHeader",
  components: { ThemeToggle },
  props: {
    isDark: Boolean,
  },
  data() {
    return {
      menuOpen: false,
      routes: [
        { path: "/champions", name: "Campeões" },
        { path: "/teams", name: "Times" },
        { path: "/players", name: "Jogadores" },
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    handleResize() {
      if (window.innerWidth > 768) {
        this.menuOpen = false;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
.header {
  background-color: var(--header-bg);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 0;
  transition: background-color 0.3s ease;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.logo img {
  height: 40px;
  transition: transform 0.3s ease;
  z-index: 101;
}

.logo:hover img {
  transform: scale(1.05);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-color);
  z-index: 101;
  padding: 0.5rem;
}

.nav {
  display: flex;
  gap: 2rem;
  transition: all 0.3s ease;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--primary-color);
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.router-link-active::after {
  width: 100%;
}

.router-link-active {
  color: var(--primary-color);
}

.theme-toggle {
  z-index: 101;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
    order: 1;
  }

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--header-bg);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    transform: translateY(-100%);
    opacity: 0;
    z-index: 100;
  }

  .nav.active {
    transform: translateY(0);
    opacity: 1;
  }

  .logo {
    order: 0;
    margin-right: auto;
  }

  .theme-toggle {
    order: 2;
    margin-left: 1rem;
  }
}
</style>
