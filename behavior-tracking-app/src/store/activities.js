import { defineStore } from "pinia";
import { useGoalSettingsStore } from "@/store/goalSettings";

export const useActivitiesStore = defineStore("activities", {
  state: () => ({
    activities: [
      // Day 1 - March 30, 2025
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

      // Day 2 - March 31, 2025
      {
        id: 5,
        title: "Doing Yoga",
        duration: 30,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-03-31T07:00:00Z",
        points: 20,
      },
      {
        id: 6,
        title: "Evening Running",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-03-31T16:00:00Z",
        points: 20,
      },
      {
        id: 7,
        title: "Reading A Book",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-03-31T06:00:00Z",
        points: 20,
      },
      {
        id: 8,
        title: "Morning Meditation",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-03-31T06:00:00Z",
        points: 40,
      },

      // Day 3 - April 1, 2025
      {
        id: 9,
        title: "Doing Yoga",
        duration: 30,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-01T07:00:00Z",
        points: 20,
      },
      {
        id: 10,
        title: "Evening Running",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-01T16:00:00Z",
        points: 20,
      },
      {
        id: 11,
        title: "Reading A Book",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-01T06:00:00Z",
        points: 20,
      },
      {
        id: 12,
        title: "Morning Meditation",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-01T06:00:00Z",
        points: 40,
      },

      // Day 4 - April 2, 2025
      {
        id: 13,
        title: "Doing Yoga",
        duration: 30,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-02T07:00:00Z",
        points: 20,
      },
      {
        id: 14,
        title: "Evening Running",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-02T16:00:00Z",
        points: 20,
      },
      {
        id: 15,
        title: "Reading A Book",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-02T06:00:00Z",
        points: 20,
      },
      {
        id: 16,
        title: "Morning Meditation",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-02T06:00:00Z",
        points: 40,
      },

      // Day 5 - April 3, 2025
      {
        id: 17,
        title: "Doing Yoga",
        duration: 30,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-03T07:00:00Z",
        points: 20,
      },
      {
        id: 18,
        title: "Evening Running",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-03T16:00:00Z",
        points: 20,
      },
      {
        id: 19,
        title: "Reading A Book",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-03T06:00:00Z",
        points: 20,
      },
      {
        id: 20,
        title: "Morning Meditation",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-03T06:00:00Z",
        points: 40,
      },

      // Day 6 - April 4, 2025
      {
        id: 21,
        title: "Doing Yoga",
        duration: 30,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-04T07:00:00Z",
        points: 20,
      },
      {
        id: 22,
        title: "Evening Running",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-04T16:00:00Z",
        points: 20,
      },
      {
        id: 23,
        title: "Reading A Book",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-04T06:00:00Z",
        points: 20,
      },
      {
        id: 24,
        title: "Morning Meditation",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-04T06:00:00Z",
        points: 40,
      },

      // Day 7 - April 5, 2025
      {
        id: 25,
        title: "Doing Yoga",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-05T07:00:00Z",
        points: 20,
      },
      {
        id: 26,
        title: "Evening Running",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-05T16:00:00Z",
        points: 20,
      },
      {
        id: 27,
        title: "Reading A Book",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-05T06:00:00Z",
        points: 20,
      },
      {
        id: 28,
        title: "Morning Meditation",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-05T06:00:00Z",
        points: 40,
      },

      // Week 1
      {
        id: 29,
        title: "Morning Meditation",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-08T06:00:00Z",
        points: 40,
      },
      {
        id: 30,
        title: "Yoga Practice",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-08T07:00:00Z",
        points: 20,
      },
      {
        id: 31,
        title: "Reading Session",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-08T14:00:00Z",
        points: 20,
      },
      {
        id: 32,
        title: "Evening Run",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-08T17:00:00Z",
        points: 20,
      },
      // Day 2
      {
        id: 33,
        title: "Morning Meditation",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-09T06:00:00Z",
        points: 40,
      },
      {
        id: 34,
        title: "Yoga Practice",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-09T07:00:00Z",
        points: 20,
      },
      {
        id: 35,
        title: "Reading Session",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-09T14:00:00Z",
        points: 20,
      },
      {
        id: 36,
        title: "Evening Run",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-09T17:00:00Z",
        points: 20,
      },
      // Continue pattern for days 3-14...
      // Day 14 (last set)
      {
        id: 81,
        title: "Morning Meditation",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-21T06:00:00Z",
        points: 40,
      },
      {
        id: 82,
        title: "Yoga Practice",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-21T07:00:00Z",
        points: 20,
      },
      {
        id: 83,
        title: "Reading Session",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-21T14:00:00Z",
        points: 20,
      },
      {
        id: 84,
        title: "Evening Run",
        duration: 0,
        status: "pending",
        timeActive: null,
        timeDone: null,
        dateCreated: "2025-04-21T17:00:00Z",
        points: 20,
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

    getLatestActivities: (state) => {
      // Get today's date at midnight UTC
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      // Find the most recent date in activities
      const latestDate = state.activities.reduce((latest, activity) => {
        const activityDate = new Date(activity.dateCreated);
        return activityDate > latest ? activityDate : latest;
      }, new Date(0));

      // If we have activities for today, return those
      if (latestDate >= today) {
        return state.activities.filter((activity) => {
          const activityDate = new Date(activity.dateCreated);
          activityDate.setUTCHours(0, 0, 0, 0);
          return activityDate.getTime() === today.getTime();
        });
      }

      // Otherwise, return activities from the latest date
      return state.activities.filter((activity) => {
        const activityDate = new Date(activity.dateCreated);
        activityDate.setUTCHours(0, 0, 0, 0);
        return activityDate.getTime() === latestDate.setUTCHours(0, 0, 0, 0);
      });
    },

    getActivitiesByDate: (state) => (date) => {
      // Convert input date to midnight UTC for comparison
      const targetDate = new Date(date);
      targetDate.setUTCHours(0, 0, 0, 0);

      // Filter activities that match the target date
      return state.activities.filter((activity) => {
        const activityDate = new Date(activity.dateCreated);
        activityDate.setUTCHours(0, 0, 0, 0);
        return activityDate.getTime() === targetDate.getTime();
      });
    },
  },

  actions: {
    startActivity(id) {
      const activity = this.getActivityById(id);
      const goalStore = useGoalSettingsStore();
      const activeGoal = goalStore.getActiveGoal;

      if (activeGoal && !activeGoal.firstActiveDate) {
        goalStore.updateFirstActiveDate(
          activeGoal.id,
          new Date().toISOString(),
        );
      }

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
