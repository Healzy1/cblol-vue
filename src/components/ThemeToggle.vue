<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :aria-label="
      isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro'
    "
  >
    <transition name="icon-flip" mode="out-in">
      <span :key="isDark ? 'sun' : 'moon'" class="icon">
        {{ isDark ? "☀️" : "🌙" }}
      </span>
    </transition>
  </button>
</template>

<script>
export default {
  name: "ThemeToggle",
  props: {
    isDark: Boolean,
  },
  methods: {
    toggleTheme() {
      this.$emit("toggle-theme");
    },
  },
};
</script>

<style scoped>
.theme-toggle {
  background: var(--toggle-bg);
  color: var(--toggle-text);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.icon {
  display: inline-block;
}

/* Animação do ícone */
.icon-flip-enter-active {
  animation: flip-in 0.3s ease-out;
}
.icon-flip-leave-active {
  animation: flip-out 0.3s ease-in;
}

@keyframes flip-in {
  0% {
    transform: rotate(-90deg);
    opacity: 0;
  }
  100% {
    transform: rotate(0deg);
    opacity: 1;
  }
}

@keyframes flip-out {
  0% {
    transform: rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: rotate(90deg);
    opacity: 0;
  }
}
</style>
