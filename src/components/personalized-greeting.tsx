"use client";

import { personalizedGreeting } from "@/ai/flows/personalized-greeting";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export function PersonalizedGreeting() {
  const [greeting, setGreeting] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    personalizedGreeting()
      .then((response) => {
        setGreeting(response.greeting);
      })
      .catch((error) => {
        console.error("Failed to get personalized greeting:", error);
        setGreeting("Welcome!"); // Fallback greeting
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Skeleton className="h-8 w-72 mx-auto" />;
  }

  return <p className="text-xl md:text-2xl text-muted-foreground">{greeting}</p>;
}
