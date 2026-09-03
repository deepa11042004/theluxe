import React from "react";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status ? status.toUpperCase() : "DRAFT";

  const getStyle = () => {
    switch (normalized) {
      case "PUBLISHED":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/30";
      case "DRAFT":
        return "bg-amber-500/10 text-amber-600 border-amber-500/30";
      case "SCHEDULED":
        return "bg-sky-500/10 text-sky-600 border-sky-500/30";
      case "ARCHIVED":
        return "bg-gray-500/10 text-gray-500 border-gray-500/30";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/30";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border tracking-wider uppercase ${getStyle()}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
      {normalized}
    </span>
  );
}
