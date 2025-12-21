"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

interface MilestoneListProps {
    goalId: string;
}

export function MilestoneList({ goalId }: MilestoneListProps) {
    const { milestones, addMilestone, toggleMilestone, deleteMilestone } = useStore();
    const [newMilestoneTitle, setNewMilestoneTitle] = useState("");

    const goalMilestones = milestones.filter((m) => m.goalId === goalId);

    const handleAddMilestone = async () => {
        if (!newMilestoneTitle.trim()) return;
        await addMilestone({
            id: crypto.randomUUID(),
            title: newMilestoneTitle,
            isCompleted: false,
            goalId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        setNewMilestoneTitle("");
    };

    return (
        <div className="space-y-3 mt-4 pt-4 border-t border-dashed">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Milestones</div>
            <div className="space-y-2">
                {goalMilestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center justify-between group">
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <Checkbox
                                id={milestone.id}
                                checked={milestone.isCompleted}
                                onCheckedChange={() => toggleMilestone(milestone.id)}
                                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            <label
                                htmlFor={milestone.id}
                                className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 truncate transition-all ${milestone.isCompleted ? 'line-through text-muted-foreground' : ''}`}
                            >
                                {milestone.title}
                            </label>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                            onClick={() => deleteMilestone(milestone.id)}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    </div>
                ))}
            </div>
            <div className="flex items-center space-x-2">
                <Input
                    placeholder="Add a milestone..."
                    value={newMilestoneTitle}
                    onChange={(e) => setNewMilestoneTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddMilestone()}
                    className="h-8 text-sm bg-muted/30 border-dashed focus:border-solid transition-all"
                />
                <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-primary/10 hover:text-primary" onClick={handleAddMilestone}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
