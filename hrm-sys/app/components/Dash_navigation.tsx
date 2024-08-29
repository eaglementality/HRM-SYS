"use client"
import Link from "next/link";
import { useState } from "react";

export const Dash_Navigation = () => {
  const [numberHolder, setNumberHolder] = useState(0);
  const navContent = [
    { id: 0, item: "Dashboard", route: "/" },
    { id: 1, item: "Admin", route: "/adminView" },
  ];
  return (
    <div className="grid justify-center space-y-8  p-2 mt-2">
      {navContent.map(({ id, item, route }) => (
        <Link
          href={route}
          className={`${
            numberHolder === id && "bg-black text-white"
          } px-16 cursor-pointer py-2 rounded-lg`}
          key={id}
          onClick={() => {
            setNumberHolder(id);
          }}
        >
          {item}
        </Link>
      ))}
    </div>
  );
};
