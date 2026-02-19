
"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "./button";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { PrivacyModal } from "../PrivacyModal";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex h-16 items-center justify-between px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2">
        <span className="font-semibold">Home</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="/Proiecte"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Proiecte
        </Link>
        <PrivacyModal>
          <span className="text-sm font-medium hover:underline underline-offset-4 cursor-pointer">
            Privacy & Contact
          </span>
        </PrivacyModal>
      </nav>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-6 p-6">
            <Link
              href="/"
              className="text-lg font-semibold"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/Proiecte"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => setOpen(false)}
            >
              Proiecte
            </Link>
            <PrivacyModal>
              <span
                className="text-sm font-medium hover:underline underline-offset-4 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                Privacy & Contact
              </span>
            </PrivacyModal>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
