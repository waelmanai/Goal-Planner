"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Download, Upload, Trash2, AlertTriangle } from "lucide-react";
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
import { db } from "@/lib/db";

export function DataManagement() {
    const { categories, goals, milestones, achievements, loadData } = useStore();
    const [importing, setImporting] = useState(false);

    const handleExport = () => {
        const data = {
            categories,
            goals,
            milestones,
            achievements,
            exportDate: new Date().toISOString(),
            version: "1.0",
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `2026-backup-${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setImporting(true);
        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                const content = e.target?.result as string;
                const data = JSON.parse(content);

                // Basic validation
                if (!data.categories || !data.goals) {
                    alert("Invalid backup file format.");
                    return;
                }

                // Clear existing data (optional, but safer for import)
                // For now, we'll just append/overwrite if IDs match, but let's do a clean wipe for simplicity in this version
                // or just add them. Let's add them for now to avoid accidental data loss, 
                // but ideally we should wipe first if it's a full restore.
                // Let's implement a "Wipe & Restore" approach for simplicity and consistency.

                await db.clearAll(); // We need to add this to db.ts or just iterate delete

                // Re-add data
                for (const c of data.categories) await db.addCategory(c);
                for (const g of data.goals) await db.addGoal(g);
                for (const m of data.milestones) await db.addMilestone(m);
                for (const a of data.achievements) await db.addAchievement(a);

                await loadData();
                alert("Data imported successfully!");
            } catch (error) {
                console.error("Import failed:", error);
                alert("Failed to import data. Please check the file.");
            } finally {
                setImporting(false);
            }
        };

        reader.readAsText(file);
    };

    const handleReset = async () => {
        try {
            // We need a clearAll method in db.ts, or we can just delete everything one by one
            // For now, let's assume we iterate.
            // Actually, let's add clearAll to db.ts first.
            // But since I can't edit db.ts right now without a separate step, I'll use what I have.
            // I'll just delete the databases using indexedDB API directly or iterate.
            // Iterating is safer with the current store setup.

            // Wait, I can edit db.ts. I should do that.
            // For now, let's just use the store actions if possible, but store actions are one by one.
            // Let's just use the raw DB object if exposed, or just iterate.

            // Actually, I'll just iterate for now to be safe and use the store's loadData to refresh.
            // But wait, iterating over everything to delete is slow.
            // I will add a clearAll method to db.ts in a subsequent step.
            // For this file, I'll assume db.clearAll() exists and I will add it next.

            await db.clearAll();
            await loadData();
            alert("All data has been reset.");
        } catch (error) {
            console.error("Reset failed", error);
            alert("Failed to reset data.");
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Export Data</CardTitle>
                    <CardDescription>
                        Download a backup of your goals, categories, and achievements.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={handleExport} className="w-full sm:w-auto gap-2">
                        <Download className="h-4 w-4" />
                        Export JSON
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Import Data</CardTitle>
                    <CardDescription>
                        Restore your data from a backup file. Warning: This will replace your current data.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Input
                            type="file"
                            accept=".json"
                            onChange={handleImport}
                            disabled={importing}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="border-destructive/50 bg-destructive/5">
                <CardHeader>
                    <CardTitle className="text-destructive flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Danger Zone
                    </CardTitle>
                    <CardDescription>
                        Permanently delete all your data. This action cannot be undone.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full sm:w-auto gap-2">
                                <Trash2 className="h-4 w-4" />
                                Reset All Data
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete all your
                                    categories, goals, milestones, and achievements from this device.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleReset} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    Yes, delete everything
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>
    );
}
