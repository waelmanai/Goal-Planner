"use client";

import { DataManagement } from "@/components/data-management";
import { ModeToggle } from "@/components/mode-toggle";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <div className="container max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your preferences and data.</p>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>Customize how the app looks on your device.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <span className="text-sm font-medium">Theme</span>
                        <ModeToggle />
                    </CardContent>
                </Card>

                <DataManagement />
            </div>
        </div>
    );
}
