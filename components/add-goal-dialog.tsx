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
import { Plus } from "lucide-react";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    targetValue: z.string().optional(), // Input as string, convert to number
    unit: z.string().optional(),
});

interface AddGoalDialogProps {
    categoryId: string;
    trigger?: React.ReactNode;
}

export function AddGoalDialog({ categoryId, trigger }: AddGoalDialogProps) {
    const [open, setOpen] = useState(false);
    const { addGoal } = useStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            targetValue: "",
            unit: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await addGoal({
            id: crypto.randomUUID(),
            title: values.title,
            categoryId,
            currentValue: 0,
            targetValue: values.targetValue ? parseFloat(values.targetValue) : undefined,
            isCompleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        setOpen(false);
        form.reset();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button size="sm" className="gap-2 shadow-sm">
                        <Plus className="h-4 w-4" />
                        Add Goal
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Goal</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Read 10 books" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="targetValue"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Target Value</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="10" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="unit"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Unit</FormLabel>
                                        <FormControl>
                                            <Input placeholder="books" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit">Save</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
