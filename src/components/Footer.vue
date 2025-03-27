<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="footer-text">
        CBLOL Vue - Desenvolvido para Avaliação de Desenvolvimento Web
      </p>
      <div class="footer-bottom">
        <p class="copyright">
          © Icaro Reis 2025 - Todos os direitos reservados
        </p>
        <a
          href="https://github.com/Healzy1"
          target="_blank"
          class="github-icon"
          aria-label="GitHub"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
.footer {
  background-color: #474a51;
  padding: 2rem 0;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 3rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-text {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 500;
}

.footer-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.copyright {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
}

.github-icon {
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
}

.github-icon:hover {
  color: white;
  transform: translateY(-2px);
}

.github-icon svg {
  width: 20px;
  height: 20px;
}

/* Efeito de tema escuro/claro */
[data-theme="dark"] .footer {
  background-color: #2d2f33;
  border-top-color: rgba(255, 255, 255, 0.05);
}

[data-theme="dark"] .github-icon:hover {
  color: #6b8cff;
}
</style>
