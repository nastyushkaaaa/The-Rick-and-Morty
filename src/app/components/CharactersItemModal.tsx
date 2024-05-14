import { Character } from "@/app/lib/api";
import { useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Image from "next/image";

export interface CharacterProps {
  character: Character;
  onClose: () => void;
}

export default function CharactersItemModal({
  character,
  onClose,
}: CharacterProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: "1200",
      }}
      onClick={handleBackdropClick}
    >
      <div className="absolute w-[400px] h-[600px] bg-white p-[20px] pt-[50px] rounded-md flex flex-col text-[18px] gap-[5px] items-center">
        <button
          type="button"
          onClick={() => onClose()}
          className="w-[24px] h-[24px] absolute right-[20px] top-[20px]"
        >
          <IoMdCloseCircleOutline className="w-[24px] h-[24px]" />
        </button>
        <Image
          src={character.image}
          alt={`${character.name} image`}
          width={270}
          height={270}
          className="rounded-[10px] self-center"
        ></Image>
        <div className="mt-[10px] flex gap-[5px] flex-col w-[270px]">
          <h2>{character.name}</h2>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin.name}</p>
          <p>Location: {character.location.name}</p>
        </div>
      </div>
    </div>
  );
}
