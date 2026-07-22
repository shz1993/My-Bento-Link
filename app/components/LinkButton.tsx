import React from "react";

interface LinkButtonProps {
  title: string;
  url: string;
  icon?: React.ReactNode;
}

export default function LinkButton({ title, url, icon }: LinkButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between w-full p-4 mb-3 bg-white/80 hover:bg-white backdrop-blur-md border border-gray-200 rounded-2xl shadow-sm transition-all hover:scale-[1.02] hover:shadow-md group"
    >
      <div className="flex items-center space-x-3">
        {icon && <span className="text-gray-700">{icon}</span>}
        <span className="font-medium text-gray-800">{title}</span>
      </div>
      <span className="text-gray-400 group-hover:translate-x-1 transition-transform group-hover:text-gray-600">
        →
      </span>
    </a>
  );
}