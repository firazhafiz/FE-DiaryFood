import React from "react";

interface instructions{
 id: number;
 resepId:number;
  urutan: number;
  deskripsi: string;
}

interface InstructionsSectionProps {
  instructions: instructions[];
  notes?: string;
}

const InstructionsSection: React.FC<InstructionsSectionProps> = ({ instructions, notes }) => {
  return (
    <div className="min-h-auto w-full">
      <div className=" rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Instructions</h2>
        <ol className="space-y-4 mb-6">
          {instructions.map((instruction, index) => (
            <li key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[color:var(--custom-orange)] text-white font-semibold text-sm">{index + 1}</div>
              </div>
              <div className="text-gray-700 text-sm">{instruction.deskripsi}</div>
            </li>
          ))}
        </ol>

        {notes && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Notes</h3>
            <p className="text-gray-600 text-sm italic">{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructionsSection;
