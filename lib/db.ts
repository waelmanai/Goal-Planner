import { openDB, DBSchema } from 'idb';

interface AppDB extends DBSchema {
    categories: {
        key: string;
        value: {
            id: string;
            name: string;
            icon?: string;
            color?: string;
            createdAt: Date;
            updatedAt: Date;
            _synced?: number; // 0 = false, 1 = true
        };
        indexes: { 'by-synced': number };
    };
    goals: {
        key: string;
        value: {
            id: string;
            title: string;
            description?: string;
            categoryId: string;
            targetValue?: number;
            currentValue: number;
            unit?: string;
            deadline?: Date;
            isCompleted: boolean;
            createdAt: Date;
            updatedAt: Date;
            _synced?: number;
        };
        indexes: { 'by-category': string; 'by-synced': number };
    };
    logs: {
        key: string;
        value: {
            id: string;
            goalId: string;
            value: number;
            note?: string;
            date: Date;
            _synced?: number;
        };
        indexes: { 'by-goal': string; 'by-synced': number };
    };
    milestones: {
        key: string;
        value: {
            id: string;
            title: string;
            isCompleted: boolean;
            goalId: string;
            createdAt: Date;
            updatedAt: Date;
            _synced?: number;
        };
        indexes: { 'by-goal': string; 'by-synced': number };
    };
    achievements: {
        key: string;
        value: {
            id: string;
            title: string;
            description: string;
            icon: string;
            unlockedAt: Date;
            _synced?: number;
        };
        indexes: { 'by-synced': number };
    };
}

const DB_NAME = '2026-pwa-db';
const DB_VERSION = 2;

export const initDB = async () => {
    return openDB<AppDB>(DB_NAME, DB_VERSION, {
        upgrade(db, oldVersion, newVersion, transaction) {
            if (!db.objectStoreNames.contains('categories')) {
                const store = db.createObjectStore('categories', { keyPath: 'id' });
                store.createIndex('by-synced', '_synced');
            }
            if (!db.objectStoreNames.contains('goals')) {
                const store = db.createObjectStore('goals', { keyPath: 'id' });
                store.createIndex('by-category', 'categoryId');
                store.createIndex('by-synced', '_synced');
            }
            if (!db.objectStoreNames.contains('logs')) {
                const store = db.createObjectStore('logs', { keyPath: 'id' });
                store.createIndex('by-goal', 'goalId');
                store.createIndex('by-synced', '_synced');
            }
            if (!db.objectStoreNames.contains('milestones')) {
                const store = db.createObjectStore('milestones', { keyPath: 'id' });
                store.createIndex('by-goal', 'goalId');
                store.createIndex('by-synced', '_synced');
            }
            if (!db.objectStoreNames.contains('achievements')) {
                const store = db.createObjectStore('achievements', { keyPath: 'id' });
                store.createIndex('by-synced', '_synced');
            }
        },
    });
};

export const db = {
    async getCategories() {
        const db = await initDB();
        return db.getAll('categories');
    },
    async addCategory(category: AppDB['categories']['value']) {
        const db = await initDB();
        return db.put('categories', category);
    },
    async deleteCategory(id: string) {
        const db = await initDB();
        return db.delete('categories', id);
    },
    async getGoals() {
        const db = await initDB();
        return db.getAll('goals');
    },
    async addGoal(goal: AppDB['goals']['value']) {
        const db = await initDB();
        return db.put('goals', goal);
    },
    async deleteGoal(id: string) {
        const db = await initDB();
        return db.delete('goals', id);
    },
    async getMilestones() {
        const db = await initDB();
        return db.getAll('milestones');
    },
    async addMilestone(milestone: AppDB['milestones']['value']) {
        const db = await initDB();
        return db.put('milestones', milestone);
    },
    async deleteMilestone(id: string) {
        const db = await initDB();
        return db.delete('milestones', id);
    },
    async getAchievements() {
        const db = await initDB();
        return db.getAll('achievements');
    },
    async addAchievement(achievement: AppDB['achievements']['value']) {
        const db = await initDB();
        return db.put('achievements', achievement);
    },
};
