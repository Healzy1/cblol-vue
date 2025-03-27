<template>
  <div class="app" :data-theme="isDark ? 'dark' : 'light'">
    <Header @toggle-theme="toggleTheme" :isDark="isDark" />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: { Header, Footer },
  setup() {
    const isDark = ref(false);

    const checkTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      isDark.value = savedTheme ? savedTheme === "dark" : systemDark;
    };

    const toggleTheme = () => {
      isDark.value = !isDark.value;
      localStorage.setItem("theme", isDark.value ? "dark" : "light");
    };

    onMounted(checkTheme);

    return { isDark, toggleTheme };
  },
};
</script>

<style>
/* Transições globais */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.5s, color 0.3s;
}

.main-content {
  flex: 1;
  padding-top: 80px;
}
</style>
