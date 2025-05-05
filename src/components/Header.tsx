"use client";

import Image from "next/image";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-start gap-3 bg-[--background] p-3 shadow-md">
      <Link href="/">
        <Image src="/workout.png" alt="Workout Logo" width={80} height={14} />
      </Link>
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-[--teal]">Workout Finder</h1>
        <p className="text-sm text-[--gray]">
          Find workouts based on your preferences
        </p>
      </div>
    </header>
  );
};

export default Header;
