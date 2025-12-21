"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";

const formSchema = z.object({
    value: z.string().min(1, "Value is required"), // Input as string
    note: z.string().optional(),
});

interface LogProgressDialogProps {
    goalId: string;
    currentValue: number;
}

export function LogProgressDialog({ goalId, currentValue }: LogProgressDialogProps) {
    const [open, setOpen] = useState(false);
    // We need an action in store to update goal progress
    // For now, we'll just update the goal directly if we don't have a specific log action yet
    // But ideally we should have addLog and updateGoal
    // Let's assume we add updateGoal to store
    const { updateGoal } = useStore() as any; // Temporary cast until we update store interface

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: "",
            note: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const addedValue = parseFloat(values.value);
        if (isNaN(addedValue)) return;

        const newValue = currentValue + addedValue;

        // We should also create a ProgressLog entry in DB, but for now let's just update the goal
        // TODO: Implement addLog in store

        if (updateGoal) {
            await updateGoal(goalId, { currentValue: newValue });
        }

        setOpen(false);
        form.reset();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost" className="h-6 w-6">
                    <PlusCircle className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Log Progress</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value to Add</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g. 1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="note"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Note (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Read chapter 1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Save</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
