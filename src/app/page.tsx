"use client";

import { QueryClientProvider } from "react-query";
import queryClient from "@/app/lib/utils/QueryClient";
import CharactersList from "@/app/components/CharactersList";

export default function Home() {
  return (
    <QueryClientProvider client={queryClient()}>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <CharactersList></CharactersList>
      </main>
    </QueryClientProvider>
  );
}
