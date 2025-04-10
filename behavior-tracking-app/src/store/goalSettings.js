import { defineStore } from "pinia";
import { useActivitiesStore } from "./activities";

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
        endDate: "2025-03-31T06:00:00Z", // firstActiveDate + totalDays
        completionRate: 56,
      },
      {
        id: 2,
        title: "Evening Workout Challenge",
        dateSet: "2025-03-28T18:00:00Z",
        firstActiveDate: "2025-03-29T17:00:00Z",
        totalPoints: 450,
        totalDays: 7,
        daysPerWeek: 7,
        endDate: "2025-04-05T17:00:00Z", // firstActiveDate + totalDays
        completionRate: 64.29,
      },
      {
        id: 3,
        title: "Reading Goals",
        dateSet: "2025-03-30T10:00:00Z",
        firstActiveDate: "2025-03-31T09:00:00Z",
        totalPoints: 160,
        totalDays: 4,
        daysPerWeek: 4,
        endDate: "2025-04-04T09:00:00Z", // firstActiveDate + totalDays
        completionRate: 40,
      },
      {
        id: 4,
        title: "Yoga Practice",
        dateSet: "2025-04-01T07:00:00Z",
        firstActiveDate: "2025-04-01T08:00:00Z",
        totalPoints: 300,
        totalDays: 3,
        daysPerWeek: 3,
        endDate: "2025-04-04T08:00:00Z", // firstActiveDate + totalDays
        completionRate: 100,
      },
      {
        id: 5,
        title: "Running Challenge",
        dateSet: "2025-04-02T16:00:00Z",
        firstActiveDate: null, // Not started yet
        totalPoints: 0,
        totalDays: 6,
        daysPerWeek: 6,
        endDate: null, // firstActiveDate is null
        completionRate: 0,
      },
      {
        id: 6,
        title: "New Active Challenge",
        dateSet: "2025-04-08T08:00:00Z",
        firstActiveDate: "2025-04-08T09:00:00Z",
        totalPoints: 0,
        totalDays: 14,
        daysPerWeek: 5,
        endDate: "2025-04-22T23:59:59Z",
        completionRate: 0,
      },
    ],
  }),

  getters: {
    getGoalById: (state) => (id) => {
      return state.goalSettings.find((goal) => goal.id === id);
    },

    getActiveGoal: (state) => {
      const now = new Date();
      const activitiesStore = useActivitiesStore();

      // Find the most recently started goal that hasn't ended yet
      const activeGoal = state.goalSettings
        .filter((goal) => {
          const endDate = new Date(goal.endDate);
          return endDate >= now;
        })
        .sort((a, b) => {
          if (!a.firstActiveDate) return 1;
          if (!b.firstActiveDate) return -1;
          return new Date(b.firstActiveDate) - new Date(a.firstActiveDate);
        })[0];

      if (!activeGoal) return null;

      // Get all activities within the goal's date range
      const goalActivities = activitiesStore.activities.filter((activity) => {
        const activityDate = new Date(activity.dateCreated);
        const startDate = new Date(activeGoal.firstActiveDate);
        const endDate = new Date(activeGoal.endDate);
        return activityDate >= startDate && activityDate <= endDate;
      });

      // Calculate total points from completed activities
      const totalPoints = goalActivities
        .filter((activity) => activity.status === "done")
        .reduce((sum, activity) => sum + activity.points, 0);

      // Calculate completion rate
      const maxPossiblePoints = activeGoal.totalDays * 100;
      const completionRate = Math.round(
        (totalPoints / maxPossiblePoints) * 100,
      );

      // Return goal with calculated values
      return {
        ...activeGoal,
        totalPoints,
        completionRate,
      };
    },

    getCompletedGoals: (state) => {
      const now = new Date();
      return state.goalSettings.filter((goal) => {
        const endDate = new Date(goal.endDate);
        return endDate < now;
      });
    },
  },

  actions: {
    updateFirstActiveDate(goalId, activityDate) {
      const goal = this.goalSettings.find((g) => g.id === goalId);
      if (!goal || goal.firstActiveDate) return; // Only set if not already set

      // Set first active date
      goal.firstActiveDate = activityDate;

      // Calculate end date based on first active date
      const startDate = new Date(activityDate);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + goal.totalDays - 1); // -1 because first day counts
      endDate.setHours(23, 59, 59, 999); // End of the last day

      goal.endDate = endDate.toISOString();
    },

    createGoal(goalData) {
      const newGoal = {
        ...goalData,
        firstActiveDate: null,
        endDate: null, // Will be set when first activity starts
        completionRate: 0,
      };
      this.goalSettings.push(newGoal);
    },

    updateGoalProgress({ goalId, points }) {
      const goal = this.goalSettings.find((g) => g.id === goalId);
      if (!goal) return;

      // Add points to total
      goal.totalPoints += points;

      // Recalculate completion rate
      const maxPossiblePoints = goal.totalDays * 100;
      goal.completionRate = Math.round(
        (goal.totalPoints / maxPossiblePoints) * 100,
      );
    },
  },
});
