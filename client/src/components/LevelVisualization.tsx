import React from 'react';
import { ArrowDown } from 'lucide-react';

interface Level {
  id: number;
  name: string;
  roles: string;
}

interface LevelVisualizationProps {
  levels: Level[];
}

const levelColors = [
  { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-900', accent: 'bg-blue-500' },
  { bg: 'bg-blue-200', border: 'border-blue-400', text: 'text-blue-900', accent: 'bg-blue-600' },
  { bg: 'bg-blue-300', border: 'border-blue-500', text: 'text-blue-950', accent: 'bg-blue-700' },
  { bg: 'bg-blue-900', border: 'border-blue-950', text: 'text-white', accent: 'bg-blue-950' },
];

export default function LevelVisualization({ levels }: LevelVisualizationProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      {levels.map((level, index) => {
        const colors = levelColors[index];
        const isLast = index === levels.length - 1;

        return (
          <React.Fragment key={level.id}>
            {/* Level Card */}
            <div className="w-full max-w-2xl">
              <div
                className={`${colors.bg} border-2 ${colors.border} rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer`}
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
                </div>
              </div>
            </div>

            {/* Arrow Between Levels */}
            {!isLast && (
              <div className="flex flex-col items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-300"></div>
                <ArrowDown size={20} className="text-blue-400" />
                <div className="w-1 h-8 bg-gradient-to-b from-blue-300 to-blue-200"></div>
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* Bottom Message */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm max-w-xl">
          Each level builds upon the previous one. Master the competencies at your current level, 
          then progressively develop the skills needed for advancement.
        </p>
      </div>
    </div>
  );
}
