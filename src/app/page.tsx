"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import CharactersList from "@/app/components/CharactersList";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <QueryClientProvider client={queryClient}>
        <CharactersList />
      </QueryClientProvider>
    </main>
  );
}
