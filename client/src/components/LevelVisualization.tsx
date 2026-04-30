import React from 'react';
import { ArrowDown } from 'lucide-react';

interface Level {
  id: number;
  name: string;
  roles: string;
}

interface LevelVisualizationProps {
  levels: Level[];
  selectedLevel?: number | null;
  onSelectLevel?: (levelId: number | null) => void;
}

const levelColors = [
  { bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-900', accent: 'bg-amber-600', selectedBg: 'bg-amber-200', selectedBorder: 'border-amber-500' },
  { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-900', accent: 'bg-red-600', selectedBg: 'bg-red-200', selectedBorder: 'border-red-500' },
  { bg: 'bg-red-200', border: 'border-red-400', text: 'text-red-950', accent: 'bg-red-700', selectedBg: 'bg-red-300', selectedBorder: 'border-red-600' },
  { bg: 'bg-red-900', border: 'border-red-950', text: 'text-white', accent: 'bg-red-950', selectedBg: 'bg-red-800', selectedBorder: 'border-red-800' },
];

export default function LevelVisualization({ 
  levels, 
  selectedLevel,
  onSelectLevel 
}: LevelVisualizationProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      {levels.map((level, index) => {
        const colors = levelColors[index];
        const isSelected = selectedLevel === level.id;
        const isLast = index === levels.length - 1;

        return (
          <React.Fragment key={level.id}>
            {/* Level Card */}
            <div className="w-full max-w-2xl">
              <button
                onClick={() => {
                  if (onSelectLevel) {
                    onSelectLevel(isSelected ? null : level.id);
                  }
                }}
                className={`w-full text-left transition-all duration-300 ${
                  isSelected 
                    ? `${colors.selectedBg} border-2 ${colors.selectedBorder} shadow-lg scale-105` 
                    : `${colors.bg} border-2 ${colors.border} hover:shadow-lg hover:scale-105`
                } rounded-lg p-6 cursor-pointer`}
              >
                <div className="flex items-center gap-4">
                  <div className={`${colors.accent} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                    {level.id}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-bold ${colors.text} mb-1`}>
                      {level.name}
                    </h3>
                    <p className={`text-sm ${colors.text} opacity-80`}>
                      {level.roles}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      Selected
                    </div>
                  )}
                </div>
              </button>
            </div>

            {/* Arrow Between Levels */}
            {!isLast && (
              <div className="flex flex-col items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-red-400 to-red-300"></div>
                <ArrowDown size={20} className="text-red-400" />
                <div className="w-1 h-8 bg-gradient-to-b from-red-300 to-red-200"></div>
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* Bottom Message */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm max-w-xl">
          Click on a level to view the specific competencies required for that career stage. 
          Each level builds upon the previous one, creating a clear progression path.
        </p>
      </div>
    </div>
  );
}
