"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

export function PrivacyModal({ children }: { children: ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-headline text-center">Privacy & Contact</DialogTitle>
                    <DialogDescription className="text-center pt-2">
                        My privacy policy is simple. For any questions, you can reach me at:{" "}
                        <a
                            href="mailto:matei@radulescu.org"
                            className="text-primary underline hover:text-primary/80 transition-colors"
                        >
                            matei@radulescu.org
                        </a>
                    </DialogDescription>
                </DialogHeader>
                <div className="prose prose-sm prose-invert max-w-none text-muted-foreground mt-4">
                    <h3 className="text-foreground font-semibold text-lg mb-2">No Data Collection</h3>
                    <p className="mb-4">
                        I do not collect, use, save, or have access to any of your personal data from any of my
                        applications or this website.
                    </p>
                    <p className="mb-4">
                        This website does not use cookies, tracking scripts, or any third-party analytics or
                        advertising frameworks. Since I collect no data, your personal information is safe.
                    </p>
                    <h3 className="text-foreground font-semibold text-lg mb-2">Commitment to Privacy</h3>
                    <p>
                        This website and any associated applications are created by a sole independent
                        developer. My business model does not depend on collecting or monetizing user data. I
                        value privacy and have designed my projects with this principle at the core.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
