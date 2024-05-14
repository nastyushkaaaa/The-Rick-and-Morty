"use client";

import CharactersList from "@/app/components/CharactersList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <CharactersList />
    </main>
  );
}
