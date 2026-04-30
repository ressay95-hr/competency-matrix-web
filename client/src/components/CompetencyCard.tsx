import { ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CompetencyCardProps {
  competency: any;
  type: 'core' | 'common' | 'technical';
  isExpanded: boolean;
  onToggle: () => void;
}

const typeColors = {
  core: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-100 text-red-700',
    header: 'text-red-900',
  },
  common: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-700',
    header: 'text-amber-900',
  },
  technical: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    badge: 'bg-gray-100 text-gray-700',
    header: 'text-gray-900',
  },
};

const typeLabels = {
  core: 'Core',
  common: 'Common',
  technical: 'Technical',
};

export default function CompetencyCard({
  competency,
  type,
  isExpanded,
  onToggle,
}: CompetencyCardProps) {
  const colors = typeColors[type];
  const levels = competency.levels;

  return (
    <Card
      className={`cursor-pointer transition-all duration-300 border-2 ${colors.border} ${colors.bg} hover:shadow-lg hover:scale-105`}
      onClick={onToggle}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${colors.header} mb-2`}>
              {competency.name}
            </h3>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
              {typeLabels[type]}
            </span>
          </div>
          <ChevronDown
            size={24}
            className={`text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>

        {/* Definition */}
        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
          {competency.definition}
        </p>

        {/* Expandable Content */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Behavioral Indicators by Level</h4>
            <div className="space-y-3">
              {Object.entries(levels).map(([level, description]) => (
                <div key={level} className="flex gap-3">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-red-600 to-amber-600 text-white text-xs font-bold">
                      {level}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {String(description)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
