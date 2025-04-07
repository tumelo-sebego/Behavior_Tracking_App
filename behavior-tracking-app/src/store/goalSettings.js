import { defineStore } from "pinia";

export const useGoalSettingsStore = defineStore("goalSettings", {
  state: () => ({
    goalSettings: [
      {
        id: 1,
        title: "Morning Meditation Routine",
        dateSet: "2025-03-25T08:00:00Z",
        firstActiveDate: "2025-03-26T06:00:00Z",
        totalPoints: 280,
        totalDays: 5,
        daysPerWeek: 5,
        endDate: "2025-04-30T23:59:59Z",
        completionRate: 56, // (280 / (5 * 100)) * 100
      },
      {
        id: 2,
        title: "Evening Workout Challenge",
        dateSet: "2025-03-28T18:00:00Z",
        firstActiveDate: "2025-03-29T17:00:00Z",
        totalPoints: 450,
        totalDays: 7,
        daysPerWeek: 7,
        endDate: "2025-05-15T23:59:59Z",
        completionRate: 64.29, // (450 / (7 * 100)) * 100
      },
      {
        id: 3,
        title: "Reading Goals",
        dateSet: "2025-03-30T10:00:00Z",
        firstActiveDate: "2025-03-31T09:00:00Z",
        totalPoints: 160,
        totalDays: 4,
        daysPerWeek: 4,
        endDate: "2025-04-20T23:59:59Z",
        completionRate: 40, // (160 / (4 * 100)) * 100
      },
      {
        id: 4,
        title: "Yoga Practice",
        dateSet: "2025-04-01T07:00:00Z",
        firstActiveDate: "2025-04-01T08:00:00Z",
        totalPoints: 300,
        totalDays: 3,
        daysPerWeek: 3,
        endDate: "2025-05-01T23:59:59Z",
        completionRate: 100, // (300 / (3 * 100)) * 100
      },
      {
        id: 5,
        title: "Running Challenge",
        dateSet: "2025-04-02T16:00:00Z",
        firstActiveDate: null, // Not started yet
        totalPoints: 0,
        totalDays: 6,
        daysPerWeek: 6,
        endDate: "2025-05-31T23:59:59Z",
        completionRate: 0, // (0 / (6 * 100)) * 100
      },
    ],
  }),

  getters: {
    getGoalById: (state) => (id) => {
      return state.goalSettings.find((goal) => goal.id === id);
    },

    getActiveGoals: (state) => {
      const now = new Date();
      return state.goalSettings.filter((goal) => {
        const endDate = new Date(goal.endDate);
        return endDate >= now;
      });
    },

    getCompletedGoals: (state) => {
      const now = new Date();
      return state.goalSettings.filter((goal) => {
        const endDate = new Date(goal.endDate);
        return endDate < now;
      });
    },
  },
});
