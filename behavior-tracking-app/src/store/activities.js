import { defineStore } from "pinia";

export const useActivitiesStore = defineStore("activities", {
  state: () => ({
    activities: [
      {
        id: 1,
        title: "Doing Yoga",
        duration: 30,
        status: "done",
        timeActive: "2025-03-30T07:00:00Z",
        timeDone: "2025-03-30T07:30:00Z",
        dateCreated: "2025-03-29T09:00:00Z",
        points: 20,
      },
      {
        id: 2,
        title: "Evening Running",
        duration: 0,
        status: "expired",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-03-30T16:00:00Z",
        points: 20,
      },
      {
        id: 3,
        title: "Reading A Book",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-03-30T06:00:00Z",
        points: 20,
      },
      {
        id: 4,
        title: "Morning Meditation",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-03-31T06:00:00Z",
        points: 40,
      },
    ],
    activeActivityId: null, // Track the currently active activity
    activeElapsedTime: 0, // Counter for the currently active activity
    timer: null, // Timer reference
  }),

  getters: {
    getActivityById: (state) => (id) => {
      return state.activities.find((activity) => activity.id === id);
    },
    hasActiveActivity: (state) => {
      return state.activities.some((activity) => activity.status === "active");
    },
  },

  actions: {
    startActivity(id) {
      console.log("Starting activity with ID:", id);
      const activity = this.getActivityById(id);
      if (activity) {
        activity.status = "active";
        activity.timeActive = new Date().toISOString();
        this.activeActivityId = id;

        // Start the timer
        if (!this.timer) {
          this.timer = setInterval(() => {
            this.activeElapsedTime += 1; // Increment the counter
          }, 1000);
        }
      }
    },
    stopActivity(id) {
      const activity = this.getActivityById(id);
      if (activity) {
        activity.status = "done";
        activity.duration = this.activeElapsedTime;
        activity.timeDone = new Date().toISOString();
        this.activeActivityId = null;

        // Stop the timer
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }

        // Reset the counter
        this.activeElapsedTime = 0;
      }
    },
    resetActivity(id) {
      const activity = this.getActivityById(id);
      if (activity) {
        activity.status = "pending";
        activity.duration = 0;
        activity.timeActive = null;
        activity.timeDone = null;
      }
    },
  },
});
