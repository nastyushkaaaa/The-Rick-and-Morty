"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  getAllCharacters,
  getFilteredCharacters,
  Character,
} from "@/app/lib/api";
import { IoIosArrowDown } from "react-icons/io";
import CharactersListItem from "./CharactersListItem";
import CharactersItemModal from "./CharactersItemModal";

type FilterStatus = "alive" | "dead" | "unknown" | "";

export default function CharactersList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["character"],
    queryFn: getAllCharacters,
    staleTime: 10 * 1000,
  });

  const [filter, setFilter] = useState<FilterStatus>("");
  const [sort, setSort] = useState(false);
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState<Character>();
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 3;

  const { data: filteredData } = useQuery({
    queryKey: ["character", filter],
    queryFn: () => getFilteredCharacters(filter),
    staleTime: 10 * 1000,
    enabled: !!filter,
  });

  const handleFilter = (status: FilterStatus) => {
    setFilter(status);
    setSort(false);
    setCurrentPage(1);
  };

  const toggleSort = () => {
    setSort((prevSort) => !prevSort);
    setCurrentPage(1);
  };

  const openModal = (character: Character) => {
    setIsModalOpen((prevState) => !prevState);
    setCurrentCharacter(character);
  };

  const toggleFilters = () => {
    setShowFilters((prevState) => !prevState);
  };

  const closeFilters = () => {
    setShowFilters(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      closeFilters();
    }
  };

  useEffect(() => {
    let updatedCharacters = filter ? filteredData : data || [];
    if (sort) {
      updatedCharacters = [...(updatedCharacters || [])].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    setCharacters(updatedCharacters || []);
  }, [data, filteredData, filter, sort]);

  const paginatedCharacters = characters
    ? characters.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div
      className="flex flex-col justify-center items-center w-full h-full relative px-[70px] py-[60px]"
      onClick={handleBackdropClick}
    >
      <div className="relative inline-block text-left self-end">
        <button
          type="button"
          onClick={() => toggleFilters()}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-200 focus:bg-green-200 hover:transition-all focus:transition-all"
        >
          Filter by status
          <IoIosArrowDown className="-mr-1 h-5 w-5 text-gray-400" />
        </button>
        {showFilters && (
          <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <button
              className="text-left py-1 hover:bg-green-200 focus:bg-green-200 hover:transition-all focus:transition-all text-gray-700 block px-4 py-2 text-sm rounded-t-md w-full h-[40px]"
              type="button"
              onClick={() => handleFilter("alive")}
            >
              Alive
            </button>
            <button
              className="text-left py-1 hover:bg-green-200 focus:bg-green-200 hover:transition-all focus:transition-all text-gray-700 block px-4 py-2 text-sm w-full h-[40px]"
              type="button"
              onClick={() => handleFilter("dead")}
            >
              Dead
            </button>
            <button
              className="text-left py-1 hover:bg-green-200 focus:bg-green-200 hover:transition-all focus:transition-all text-gray-700 block px-4 py-2 text-sm rounded-b-md w-full h-[40px]"
              type="button"
              onClick={() => handleFilter("unknown")}
            >
              Unknown
            </button>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={toggleSort}
        className="absolute left-[70px] top-[60px] inline-flex w-120px justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-200 focus:bg-green-200 hover:transition-all focus:transition-all"
      >
        Toggle sort by alphabet
      </button>
      <h1 className="text-[62px]">
        All {filter} {sort ? "sorted" : ""} characters
      </h1>
      <ul className="flex flex-wrap gap-[90px] justify-between mt-[50px]">
        {paginatedCharacters.map((character) => (
          <CharactersListItem
            key={character.id}
            character={character}
            openModal={() => openModal(character)}
          />
        ))}
      </ul>
      <div className="mt-[50px] flex flex-row gap-[30px]">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="text-[25px] hover:text-green-200 focus:text-green-200 hover:transition-all focus:transition-all"
        >
          Previous Page
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(
                prev + 1,
                Math.ceil(characters ? characters.length / itemsPerPage : 0)
              )
            )
          }
          disabled={
            currentPage ===
            Math.ceil(characters ? characters.length / itemsPerPage : 0)
          }
          className="text-[25px] hover:text-green-200 focus:text-green-200 hover:transition-all focus:transition-all"
        >
          Next Page
        </button>
      </div>
      {isModalOpen && currentCharacter && (
        <CharactersItemModal
          character={currentCharacter}
          onClose={() => openModal(currentCharacter)}
        />
      )}
    </div>
  );
}
