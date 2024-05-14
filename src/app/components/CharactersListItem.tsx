"use client";

import React from "react";
import { Character } from "@/app/lib/api";
import Image from "next/image";

export interface CharacterProps {
  character: Character;
  openModal: () => void;
}

export default function CharactersListItem({
  character,
  openModal,
}: CharacterProps) {
  return (
    <li key={character.id} className="text-[20px] flex flex-col gap-[5px]">
      <Image
        src={character.image}
        alt={`${character.name} image`}
        width={230}
        height={230}
        className="rounded-[10px]"
      ></Image>
      <h2>{character.name}</h2>
      <p>Status: {character.status}</p>
      <p>Gender: {character.gender}</p>
      <button
        type="button"
        onClick={() => openModal()}
        className="self-start inline-flex w-120px justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-200 focus:bg-green-200 hover:transition-all focus:transition-all"
      >
        Show more
      </button>
    </li>
  );
}
