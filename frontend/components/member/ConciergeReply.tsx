import React from "react";
import { MessageSquareText } from "lucide-react";
import { formatDate } from "@/components/member/MemberContext";

// The message an admin wrote for the member on a stay request (e.g. the hotel that was allotted).
export default function ConciergeReply({ message, repliedAt }: { message?: string | null; repliedAt?: string | null }) {
  if (!message) return null;
  return (
    <div className="mt-4 rounded-xl border border-[#E39F25]/40 bg-[#FFF8EA] p-4">
      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#B97A0C]">
        <MessageSquareText className="w-4 h-4" />
        Message from your concierge
        {repliedAt && <span className="font-medium normal-case tracking-normal text-neutral-400">· {formatDate(repliedAt)}</span>}
      </p>
      <p className="mt-2 text-sm text-neutral-800 whitespace-pre-line">{message}</p>
    </div>
  );
}
