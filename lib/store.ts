import { create } from 'zustand';
import { db } from './db';

interface Category {
    id: string;
    name: string;
    icon?: string;
    color?: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Milestone {
    id: string;
    title: string;
    isCompleted: boolean;
    goalId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Goal {
    id: string;
    title: string;
    description?: string;
    categoryId: string;
    currentValue: number;
    targetValue?: number;
    unit?: string;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: Date;
}

interface AppState {
    categories: Category[];
    goals: Goal[];
    milestones: Milestone[];
    achievements: Achievement[];
    isLoading: boolean;
    loadData: () => Promise<void>;
    addCategory: (category: Category) => Promise<void>;
    addGoal: (goal: Goal) => Promise<void>;
    updateGoal: (id: string, updates: Partial<Goal>) => Promise<void>;
    addMilestone: (milestone: Milestone) => Promise<void>;
    toggleMilestone: (id: string) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
    deleteGoal: (id: string) => Promise<void>;
    deleteMilestone: (id: string) => Promise<void>;
    checkAchievements: () => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
    categories: [],
    goals: [],
    milestones: [],
    achievements: [],
    isLoading: true,
    loadData: async () => {
        set({ isLoading: true });
        try {
            const categories = await db.getCategories();
            const goals = await db.getGoals();
            const milestones = await db.getMilestones();
            const achievements = await db.getAchievements();

            set({
                categories,
                goals: goals as any,
                milestones: milestones as any,
                achievements: achievements as any,
                isLoading: false
            });
        } catch (error) {
            console.error('Failed to load data', error);
            set({ isLoading: false });
        }
    },
    addCategory: async (category) => {
        await db.addCategory({ ...category, createdAt: new Date(), updatedAt: new Date(), _synced: 0 });
        set((state) => ({ categories: [...state.categories, category] }));
    },
    addGoal: async (goal) => {
        await db.addGoal({ ...goal, createdAt: new Date(), updatedAt: new Date(), _synced: 0 });
        set((state) => ({ goals: [...state.goals, goal] }));
        get().checkAchievements();
    },
    updateGoal: async (id, updates) => {
        const state = get();
        const goal = state.goals.find((g) => g.id === id);
        if (!goal) return;

        const updatedGoal = { ...goal, ...updates, updatedAt: new Date() };
        await db.addGoal({ ...updatedGoal, _synced: 0 });
        set((state) => ({
            goals: state.goals.map((g) => (g.id === id ? updatedGoal : g)),
        }));
        get().checkAchievements();
    },
    addMilestone: async (milestone) => {
        await db.addMilestone({ ...milestone, createdAt: new Date(), updatedAt: new Date(), _synced: 0 });
        set((state) => ({ milestones: [...state.milestones, milestone] }));
        get().checkAchievements();
    },
    toggleMilestone: async (id) => {
        const state = get();
        const milestone = state.milestones.find((m) => m.id === id);
        if (!milestone) return;

        const updatedMilestone = { ...milestone, isCompleted: !milestone.isCompleted, updatedAt: new Date() };
        await db.addMilestone({ ...updatedMilestone, _synced: 0 });
        set((state) => ({
            milestones: state.milestones.map((m) => (m.id === id ? updatedMilestone : m)),
        }));
        get().checkAchievements();
    },
    deleteCategory: async (id) => {
        const state = get();
        const goalsToDelete = state.goals.filter((g) => g.categoryId === id);

        for (const goal of goalsToDelete) {
            await get().deleteGoal(goal.id);
        }

        await db.deleteCategory(id);
        set((state) => ({
            categories: state.categories.filter((c) => c.id !== id)
        }));
    },
    deleteGoal: async (id) => {
        const state = get();
        const milestonesToDelete = state.milestones.filter((m) => m.goalId === id);

        for (const milestone of milestonesToDelete) {
            await db.deleteMilestone(milestone.id);
        }

        await db.deleteGoal(id);
        set((state) => ({
            goals: state.goals.filter((g) => g.id !== id),
            milestones: state.milestones.filter((m) => m.goalId !== id)
        }));
    },
    deleteMilestone: async (id) => {
        await db.deleteMilestone(id);
        set((state) => ({
            milestones: state.milestones.filter((m) => m.id !== id)
        }));
    },
    checkAchievements: async () => {
        const state = get();
        const { goals, milestones, achievements } = state;
        const newAchievements: Achievement[] = [];

        // Achievement: First Goal Created
        if (goals.length > 0 && !achievements.some(a => a.id === 'first-goal')) {
            newAchievements.push({
                id: 'first-goal',
                title: 'Visionary',
                description: 'Created your first goal for 2026',
                icon: 'Target',
                unlockedAt: new Date()
            });
        }

        // Achievement: First Milestone Completed
        if (milestones.some(m => m.isCompleted) && !achievements.some(a => a.id === 'first-milestone')) {
            newAchievements.push({
                id: 'first-milestone',
                title: 'Baby Steps',
                description: 'Completed your first milestone',
                icon: 'Footprints',
                unlockedAt: new Date()
            });
        }

        // Achievement: Goal Completed (100% progress or marked completed)
        const completedGoals = goals.filter(g => g.isCompleted || (g.targetValue && g.currentValue >= g.targetValue));
        if (completedGoals.length > 0 && !achievements.some(a => a.id === 'first-completion')) {
            newAchievements.push({
                id: 'first-completion',
                title: 'Achiever',
                description: 'Completed your first goal!',
                icon: 'Trophy',
                unlockedAt: new Date()
            });
        }

        if (newAchievements.length > 0) {
            for (const achievement of newAchievements) {
                await db.addAchievement({ ...achievement, _synced: 0 });
            }
            set((state) => ({ achievements: [...state.achievements, ...newAchievements] }));
        }
    }
}));
