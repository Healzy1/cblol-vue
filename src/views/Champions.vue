<template>
  <div class="champions-page">
    <h1 class="page-title">Campeões do CBLOL 2024</h1>

    <div class="champions-container">
      <!-- LOUD -->
      <div class="champion-card" data-aos="fade-right">
        <div class="card-content">
          <h2>LOUD - Campeã do 1° Split</h2>
          <div class="text-content" data-aos="fade-up" data-aos-delay="300">
            <p>
              A equipe LOUD se destacou no cenário competitivo da primeira etapa
              do CBLOL 2024, mostrando uma performance incrível ao longo do
              torneio. Em uma final cheia de emoções e reviravoltas, a LOUD
              enfrentou a tradicional paiN Gaming e venceu por 3–2, garantindo o
              título de campeã. A equipe mostrou uma sinergia excepcional,
              estratégias bem elaboradas e uma habilidade mecânica que cativou
              os fãs. Esse título solidificou ainda mais a presença da LOUD como
              uma das maiores potências dos eSports no Brasil.
            </p>
          </div>
        </div>
        <div class="image-container" data-aos="zoom-in" data-aos-delay="500">
          <img
            src="@/assets/images/loud.png"
            alt="Equipe LOUD campeã CBLOL 2024"
            class="team-image"
            @mouseenter="hoverAnimation('loud')"
            @mouseleave="resetAnimation('loud')"
            :style="imageStyles.loud"
          />
        </div>
      </div>

      <!-- paiN Gaming -->
      <div class="champion-card" data-aos="fade-left">
        <div class="image-container" data-aos="zoom-in" data-aos-delay="500">
          <img
            src="@/assets/images/pain.jpg"
            alt="Equipe paiN Gaming campeã CBLOL 2024"
            class="team-image"
            @mouseenter="hoverAnimation('pain')"
            @mouseleave="resetAnimation('pain')"
            :style="imageStyles.pain"
          />
        </div>
        <div class="card-content">
          <h2>paiN Gaming - Campeã do 2° Split</h2>
          <div class="text-content" data-aos="fade-up" data-aos-delay="300">
            <p>
              A paiN Gaming provou mais uma vez sua força no cenário competitivo
              ao conquistar o título da segunda etapa do CBLOL 2024. Enfrentando
              a Vivo Keyd Stars na grande final, a paiN levou a melhor com um
              placar de 3–1. O desempenho da equipe foi marcado por jogadas
              decisivas, foco e muita determinação. Essa conquista não só trouxe
              mais um troféu para a galeria da paiN Gaming, mas também reafirmou
              sua posição como um dos times mais icônicos da história do CBLOL.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

export default {
  name: "ChampionsView",
  setup() {
    const imageStyles = ref({
      loud: {
        transform: "scale(1)",
        transition: "all 0.5s ease",
      },
      pain: {
        transform: "scale(1)",
        transition: "all 0.5s ease",
      },
    });

    const hoverAnimation = (team) => {
      imageStyles.value[team] = {
        transform: "scale(1.05) rotate(2deg)",
        filter: "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3))",
        transition: "all 0.5s ease",
      };
    };

    const resetAnimation = (team) => {
      imageStyles.value[team] = {
        transform: "scale(1)",
        filter: "none",
        transition: "all 0.5s ease",
      };
    };

    return {
      imageStyles,
      hoverAnimation,
      resetAnimation,
    };
  },
  mounted() {
    AOS.init({
      duration: 800,
      once: true,
    });
  },
};
</script>

<style scoped>
.champions-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--primary-color);
  font-size: 2.5rem;
  position: relative;
}

.page-title::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: var(--primary-color);
}

.champions-container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.champion-card {
  display: flex;
  align-items: center;
  gap: 3rem;
  background: var(--card-bg);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.champion-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.champion-card:nth-child(even) {
  flex-direction: row-reverse;
}

.card-content {
  flex: 1;
}

.card-content h2 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.text-content p {
  line-height: 1.8;
  font-size: 1.1rem;
  color: var(--text-color);
}

.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px; /* Altura mínima garantida */
}

.team-image {
  width: 100%;
  height: 300px; /* Altura fixa */
  object-fit: cover; /* Mantém proporção cobrindo o espaço */
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .champion-card,
  .champion-card:nth-child(even) {
    flex-direction: column;
    gap: 2rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .card-content h2 {
    font-size: 1.5rem;
  }

  .text-content p {
    font-size: 1rem;
  }

  .image-container {
    min-height: 250px;
    width: 100%;
  }

  .team-image {
    height: 250px; /* Altura menor em mobile */
  }
}
</style>
