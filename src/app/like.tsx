"use client";
import React from "react";
export default function Like() {
  const [likes, setLikes] = React.useState(0);
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
      onClick={() => setLikes(likes + 1)}
    >
      ♥ {likes}
    </button>
  );
}
