"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LogProgressDialog } from "./log-progress-dialog";
import { MilestoneList } from "./milestone-list";
import { useStore } from "@/lib/store";
import { Trash2, MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useState } from "react";

interface GoalCardProps {
    id: string;
    title: string;
    currentValue: number;
    targetValue?: number;
    unit?: string;
    isCompleted: boolean;
}

export function GoalCard({ id, title, currentValue, targetValue, unit, isCompleted }: GoalCardProps) {
    const { milestones, deleteGoal } = useStore();
    const goalMilestones = milestones.filter(m => m.goalId === id);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    let progress = 0;
    let progressText = "";

    if (targetValue) {
        // Numeric Goal
        progress = Math.min((currentValue / targetValue) * 100, 100);
        progressText = `${currentValue} ${unit || ''} / ${targetValue} ${unit || ''}`;
    } else if (goalMilestones.length > 0) {
        // Milestone Goal
        const completed = goalMilestones.filter(m => m.isCompleted).length;
        progress = (completed / goalMilestones.length) * 100;
        progressText = `${completed} / ${goalMilestones.length} milestones`;
    }

    return (
        <>
            <Card className={`overflow-hidden transition-all hover:shadow-lg group bg-card/50 backdrop-blur-sm ${isCompleted
                    ? 'border-green-500/50 bg-green-500/5'
                    : 'border-muted/60 hover:border-primary/20'
                }`}>
                <CardHeader className={`flex flex-row items-start justify-between space-y-0 pb-2 p-4 ${isCompleted ? 'bg-green-500/10' : 'bg-muted/20'
                    }`}>
                    <div className="flex items-center gap-2">
                        <CardTitle className="text-base font-semibold leading-tight">{title}</CardTitle>
                        {isCompleted && (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-500 text-white">
                                ✓ Completed
                            </span>
                        )}
                    </div>
                    <div className="flex items-center space-x-1">
                        {!isCompleted && <LogProgressDialog goalId={id} currentValue={currentValue} />}

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Goal
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-3">
                    <div className="flex justify-between items-end mb-2">
                        <div className="text-2xl font-bold tracking-tight">
                            {targetValue ? currentValue : (goalMilestones.length > 0 ? Math.round(progress) + '%' : '')}
                            {unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
                        </div>
                        <div className="text-xs text-muted-foreground font-medium bg-muted px-2 py-1 rounded-full">{progressText || 'No target'}</div>
                    </div>

                    {(targetValue || goalMilestones.length > 0) && (
                        <Progress value={progress} className="h-2.5 mb-4" />
                    )}

                    <MilestoneList goalId={id} />
                </CardContent>
            </Card>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Goal?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete "{title}" and all its milestones.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteGoal(id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
