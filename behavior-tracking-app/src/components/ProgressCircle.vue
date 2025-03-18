<template>
  <div class="progress-container">
    <!-- Progress Circle -->
    <Chart
      type="doughnut"
      :data="chartData"
      :options="chartOptions"
      class="small-chart" />
    <div class="progress-text">{{ progress }}%</div>
  </div>
</template>

<script>
import { Chart } from "primevue/chart";

export default {
  components: { Chart },
  props: {
    progress: {
      type: Number,
      required: true,
    },
  },
  computed: {
    chartData() {
      return {
        datasets: [
          {
            data: [this.progress, 100 - this.progress], // Completed vs Remaining
            backgroundColor: ["#0078F0", "#E5E7EB"], // Progress & Track Color
            borderWidth: 6, // Thin stroke
            borderRadius: 10, // Rounded edges
            hoverBorderWidth: 6,
          },
        ],
      };
    },
    chartOptions() {
      return {
        cutout: "80%", // Makes it thinner
        plugins: {
          tooltip: { enabled: false },
          legend: { display: false },
        },
      };
    },
  },
};
</script>

<style scoped>
.progress-container {
  position: relative;
  width: 120px;
  height: 120px;
  margin: auto;
}

.small-chart {
  width: 100%;
  height: 100%;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  font-weight: bold;
  color: #0078f0;
}
</style>
