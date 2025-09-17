"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { submitContactForm } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const initialState = {
  message: "",
  errors: null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        "Send Message"
      )}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        ref={formRef}
        action={formAction}
        className="space-y-6"
        noValidate
      >
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your Name" required aria-invalid={!!state.errors?.name} />
          {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="your.email@example.com" required aria-invalid={!!state.errors?.email}/>
          {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email[0]}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" placeholder="Your message here..." className="min-h-[120px]" required aria-invalid={!!state.errors?.message}/>
          {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message[0]}</p>}
        </div>
        
        <SubmitButton />
      </form>
      
      {state.message && (
        <div role="alert" className={`mt-6 flex items-start gap-3 p-4 rounded-lg text-sm border ${state.success ? 'bg-green-50 text-green-900 border-green-200 dark:bg-green-900/20 dark:text-green-200 dark:border-green-500/30' : 'bg-red-50 text-red-900 border-red-200 dark:bg-red-900/20 dark:text-red-200 dark:border-red-500/30'}`}>
          {state.success ? <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" /> : <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />}
          <p className="flex-grow">{state.message}</p>
        </div>
      )}
    </div>
  );
}
