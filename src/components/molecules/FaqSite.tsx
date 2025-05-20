import React, { useState } from "react";

export interface FaqItem {
  question: string;
  answer: string;
}

const items: FaqItem[] = [
  {
    question: "How do I submit a recipe?",
    answer:
      "You can submit your recipe by registering an account and using the 'Submit Recipe' feature on your dashboard.",
  },
  {
    question: "Is my personal data safe on DiaryFood?",
    answer:
      "We use secure protocols and never share your data with third parties without your consent. Please read our Privacy & Security page for more details.",
  },
  {
    question: "How does the Ask AI feature work?",
    answer:
      "Ask AI allows you to get instant cooking tips and recipe suggestions by chatting with our AI assistant on the 'Ask AI' page.",
  },
  {
    question: "Can I join the DiaryFood community?",
    answer:
      "Absolutely! Register for an account to join our community, share recipes, and interact with other cooking enthusiasts.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can use the contact form on this page or email us at support@diaryfood.com.",
  },
];

const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className=" col-span-2 bg-white rounded-lg shadow-sm p-4">
      {items.map((item, idx) => (
        <div key={idx} className="mb-2 border-b border-gray-200">
          <button
            className="w-full text-left text-sm py-3 font-semibold text-gray-800 focus:outline-none flex justify-between items-center"
            onClick={() => toggle(idx)}
          >
            {item.question}
            <span className="ml-2 text-">{openIndex === idx ? "-" : "+"}</span>
          </button>
          {openIndex === idx && (
            <div className="pb-4 text-sm text-gray-600 text-sm animate-fade-in">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
