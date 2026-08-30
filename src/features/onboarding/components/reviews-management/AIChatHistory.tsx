"use client";

interface ChatMessage {
  id: string;
  sender: "assistant" | "shopper";
  text: string;
}

const mockChatHistory: ChatMessage[] = [
  {
    id: "m1",
    sender: "assistant",
    text: "Hi Marcus! How was the Zen Mode No-Caf? Did it help you unwind?",
  },
  {
    id: "m2",
    sender: "shopper",
    text: "Actually yes, it was surprisingly good. I usually need caffeine but this tasted like real coffee.",
  },
  {
    id: "m3",
    sender: "assistant",
    text: "That's great! How would you describe the flavor profile?",
  },
];

export default function AIChatHistory() {
  return (
    <div className="w-full lg:w-[410px] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl p-6 flex flex-col gap-4 font-manrope text-left border border-[#C5C5D9]/10 flex-grow">
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
        <span className="text-[#001BD2] text-xs">🤖</span>
        <span className="text-xs font-bold text-[#454656]/60 tracking-[1.2px] uppercase">
          REVIEW AI ASSISTANT HISTORY
        </span>
      </div>

      {/* Messages List */}
      <div className="flex flex-col gap-4 flex-grow overflow-y-auto max-h-[220px] pr-1">
        {mockChatHistory.map((m) => {
          const isAssistant = m.sender === "assistant";
          return (
            <div
              key={m.id}
              className={`flex w-full ${isAssistant ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[280px] p-3 text-xs leading-[20px] ${
                  isAssistant
                    ? "bg-[#F2F3FF] text-[#131B2E] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px]"
                    : "bg-[#001BD2] text-white rounded-tl-[16px] rounded-br-[16px] rounded-bl-[16px]"
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
