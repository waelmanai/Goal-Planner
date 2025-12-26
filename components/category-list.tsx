"use client";

import { useStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, FolderOpen } from "lucide-react";
import { AddCategoryDialog } from "./add-category-dialog";
import { AddGoalDialog } from "./add-goal-dialog";
import { GoalCard } from "./goal-card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function CategoryList() {
    const { categories, goals, loadData, deleteCategory } = useStore();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        loadData();
        setIsHydrated(true);
    }, [loadData]);

    if (!isHydrated) {
        return <div className="flex justify-center p-8 text-muted-foreground animate-pulse">Loading your vision...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b pb-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">Categories</h2>
                    <p className="text-sm text-muted-foreground">Manage your life areas</p>
                </div>
                <AddCategoryDialog
                    trigger={
                        <Button className="gap-2 shadow-md hover:shadow-lg transition-all">
                            <Plus className="h-4 w-4" />
                            New Category
                        </Button>
                    }
                />
            </div>

            {categories.length === 0 ? (
                <div className="text-center py-12 md:py-16 bg-muted/20 rounded-2xl border-2 border-dashed border-muted-foreground/10 mx-2 md:mx-0">
                    <div className="bg-background p-4 rounded-full inline-flex mb-4 shadow-sm">
                        <FolderOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No categories yet</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto px-4">Create your first category to start organizing your goals and dreams.</p>
                    <div className="max-w-xs mx-auto px-4">
                        <AddCategoryDialog />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:gap-10">
                    {categories.map((category) => {
                        const categoryGoals = goals.filter((g) => g.categoryId === category.id);

                        return (
                            <div key={category.id} className="space-y-4 md:space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-card p-4 md:p-5 rounded-2xl border shadow-sm hover:shadow-md transition-all group gap-4 sm:gap-0">
                                    <div className="flex items-center space-x-4">
                                        <div
                                            className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-lg md:text-xl shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                                            style={{ backgroundColor: category.color || '#e5e7eb' }}
                                        >
                                            {category.icon || "📁"}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg md:text-xl leading-none tracking-tight">{category.name}</h3>
                                            <p className="text-xs md:text-sm text-muted-foreground mt-1 md:mt-1.5 font-medium">{categoryGoals.length} Goals</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity self-end sm:self-auto">
                                        <AddGoalDialog categoryId={category.id} />

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors h-9 w-9">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Delete Category?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This will permanently delete <span className="font-semibold text-foreground">"{category.name}"</span> and all its goals. This action cannot be undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => deleteCategory(category.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-4 border-l-2 border-muted/50 ml-5">
                                    {categoryGoals.map((goal) => (
                                        <GoalCard
                                            key={goal.id}
                                            id={goal.id}
                                            title={goal.title}
                                            currentValue={goal.currentValue}
                                            targetValue={goal.targetValue}
                                            unit={goal.unit}
                                            isCompleted={goal.isCompleted}
                                        />
                                    ))}
                                    {categoryGoals.length === 0 && (
                                        <div className="col-span-full py-8 text-center text-sm text-muted-foreground bg-muted/10 rounded-lg border border-dashed">
                                            No goals in this category yet.
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
