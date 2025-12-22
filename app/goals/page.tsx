"use client";

import { CategoryList } from "@/components/category-list";

export default function GoalsPage() {
    return (
        <div className="container max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Goals</h1>
                <p className="text-muted-foreground">Manage your categories and ambitions.</p>
            </div>
            <CategoryList />
        </div>
    );
}
