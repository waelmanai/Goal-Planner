"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Activity, CheckCircle2, Target } from "lucide-react";

export function StatsOverview() {
    const { goals, categories } = useStore();

    const totalGoals = goals.length;
    const completedGoals = goals.filter((g) => g.isCompleted || (g.targetValue && g.currentValue >= g.targetValue)).length;
    const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

    // Prepare data for Pie Chart
    const categoryData = categories.map((cat) => {
        const count = goals.filter((g) => g.categoryId === cat.id).length;
        return { name: cat.name, value: count, color: cat.color || "#e5e7eb" };
    }).filter(d => d.value > 0);

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold tracking-tight text-foreground/80">Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Metric Cards */}
                <Card className="bg-primary/5 border-primary/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
                        <Target className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalGoals}</div>
                        <p className="text-xs text-muted-foreground">Active ambitions</p>
                    </CardContent>
                </Card>

                <Card className="bg-green-500/5 border-green-500/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedGoals}</div>
                        <p className="text-xs text-muted-foreground">Goals achieved</p>
                    </CardContent>
                </Card>

                <Card className="bg-blue-500/5 border-blue-500/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                        <Activity className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completionRate}%</div>
                        <p className="text-xs text-muted-foreground">Completion percentage</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            {categoryData.length > 0 && (
                <Card className="col-span-1 md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Distribution by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
