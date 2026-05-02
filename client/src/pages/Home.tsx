import { useState, useMemo } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import competencyData from '@/data/competency_data.json';
import CompetencyCard from '@/components/CompetencyCard';
import LevelVisualization from '@/components/LevelVisualization';

/**
 * Home Page - Competency Matrix & Advancement Guide
 * 
 * Design Philosophy: Modern Professional with Progressive Disclosure
 * - Color: AL-ESRAA Burgundy (#8B3A3A) with gray accents
 * - Typography: Poppins Bold for headers, Inter for body
 * - Layout: Vertical progression showing career advancement
 * - Interaction: Progressive disclosure through expandable cards
 */

export default function Home() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [competencyTypeFilter, setCompetencyTypeFilter] = useState<'all' | 'core' | 'common' | 'technical'>('all');
  const [expandedCompetencies, setExpandedCompetencies] = useState<Set<string>>(new Set());

  // Filter competencies based on search and type
  const filteredCompetencies = useMemo(() => {
    const query = searchQuery.toLowerCase();
    
    let filtered: any = {
      core: competencyData.core_competencies,
      common: selectedLevel 
        ? (competencyData.common_competencies as any)[selectedLevel.toString()] || []
        : [],
      technical: competencyData.technical_competencies,
    };

    if (competencyTypeFilter !== 'all') {
      if (competencyTypeFilter === 'core') {
        filtered = { core: filtered.core };
      } else if (competencyTypeFilter === 'common') {
        filtered = { common: filtered.common };
      } else if (competencyTypeFilter === 'technical') {
        filtered = { technical: filtered.technical };
      }
    }

    // Filter by search query
    if (query) {
      Object.keys(filtered).forEach(key => {
        if (key === 'technical') {
          if (filtered[key] && typeof filtered[key] === 'object') {
            filtered[key] = Object.fromEntries(
              Object.entries(filtered[key]).map(([family, competencies]: any) => [
                family,
                Array.isArray(competencies) ? competencies.filter((c: any) => 
                  c.name.toLowerCase().includes(query) ||
                  (c.levels && c.levels.toString().toLowerCase().includes(query))
                ) : []
              ]).filter(([_, competencies]: any) => competencies.length > 0)
            );
          }
        } else if (Array.isArray(filtered[key])) {
          filtered[key] = filtered[key].filter((c: any) =>
            c.name.toLowerCase().includes(query) ||
            (c.definition && c.definition.toLowerCase().includes(query))
          );
        }
      });
    }

    return filtered;
  }, [searchQuery, competencyTypeFilter, selectedLevel]);

  const toggleCompetency = (id: string) => {
    const newSet = new Set(expandedCompetencies);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedCompetencies(newSet);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-amber-900 via-red-900 to-red-800 py-20 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 leading-tight">Your Path to Excellence</h1>
            <p className="text-xl text-amber-100 mb-8 leading-relaxed">
              Discover the competencies that define success at every level of our organization. 
              This matrix outlines the skills, behaviors, and expertise required to advance your career 
              and achieve your professional goals.
            </p>
            <div className="flex gap-4">
              <Button 
                onClick={() => {
                  const element = document.getElementById('matrix-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Explore the Matrix
              </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => {
                const location = window.location;
                window.location.href = '/learn-more';
              }}
            >
              Learn More
            </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-red-900">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Career Levels</h3>
              <p className="text-gray-600">From Entry Level to Top Management, each with distinct competency requirements</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-amber-900">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Competency Types</h3>
              <p className="text-gray-600">Core, Common, and Technical-Functional competencies tailored to your role</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-red-900">∞</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth Potential</h3>
              <p className="text-gray-600">Clear pathways and behavioral indicators for continuous development</p>
            </div>
          </div>
        </div>
      </section>

      {/* Level Visualization */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Career Progression Framework</h2>
          <LevelVisualization 
            levels={competencyData.levels}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
          />
        </div>
      </section>

      {/* Matrix Section */}
      <section id="matrix-section" className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Competency Matrix</h2>
          
          {/* Selected Level Info */}
          {selectedLevel && (
            <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-900 rounded">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-red-900">
                    {competencyData.levels[selectedLevel - 1].name}
                  </h3>
                  <p className="text-red-800 text-sm">
                    {competencyData.levels[selectedLevel - 1].roles}
                  </p>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => setSelectedLevel(null)}
                  className="text-red-900 border-red-900 hover:bg-red-100"
                >
                  Clear Selection
                </Button>
              </div>
            </div>
          )}
          
          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <Input
                placeholder="Search competencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={competencyTypeFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setCompetencyTypeFilter('all')}
                className="text-sm"
              >
                All
              </Button>
              <Button
                variant={competencyTypeFilter === 'core' ? 'default' : 'outline'}
                onClick={() => setCompetencyTypeFilter('core')}
                className="text-sm"
              >
                Core
              </Button>
              <Button
                variant={competencyTypeFilter === 'common' ? 'default' : 'outline'}
                onClick={() => setCompetencyTypeFilter('common')}
                className="text-sm"
              >
                Common
              </Button>
              <Button
                variant={competencyTypeFilter === 'technical' ? 'default' : 'outline'}
                onClick={() => setCompetencyTypeFilter('technical')}
                className="text-sm"
              >
                Technical
              </Button>
            </div>
          </div>

          {/* Core Competencies */}
          {(competencyTypeFilter === 'all' || competencyTypeFilter === 'core') && 
           filteredCompetencies.core && filteredCompetencies.core.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-red-900 rounded-full"></span>
                Core Competencies (All Employees)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {filteredCompetencies.core.map((competency: any) => (
                  <CompetencyCard
                    key={competency.name}
                    competency={competency}
                    type="core"
                    isExpanded={expandedCompetencies.has(competency.name)}
                    onToggle={() => toggleCompetency(competency.name)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Common Competencies */}
          {competencyTypeFilter === 'all' || competencyTypeFilter === 'common' ? (
            selectedLevel ? (
              filteredCompetencies.common && filteredCompetencies.common.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-3 h-3 bg-amber-600 rounded-full"></span>
                    Common Competencies ({competencyData.levels[selectedLevel - 1].name})
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredCompetencies.common.map((competency: any) => (
                      <CompetencyCard
                        key={competency.name}
                        competency={competency}
                        type="common"
                        isExpanded={expandedCompetencies.has(competency.name)}
                        onToggle={() => toggleCompetency(competency.name)}
                      />
                    ))}
                  </div>
                </div>
              )
            ) : (
              <div className="mb-12 p-8 bg-amber-50 border-2 border-amber-200 rounded-lg text-center">
                <p className="text-amber-900 font-semibold">Please select a career level to view common competencies.</p>
              </div>
            )
          ) : null}

          {/* Technical-Functional Competencies */}
          {(competencyTypeFilter === 'all' || competencyTypeFilter === 'technical') && 
           filteredCompetencies.technical && Object.keys(filteredCompetencies.technical).length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-red-700 rounded-full"></span>
                Technical-Functional Competencies (By Department)
              </h3>
              {Object.entries(filteredCompetencies.technical).map(([family, competencies]: any) => (
                <div key={family} className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4 capitalize">{family}</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {competencies.map((competency: any) => (
                      <CompetencyCard
                        key={`${family}-${competency.name}`}
                        competency={competency}
                        type="technical"
                        isExpanded={expandedCompetencies.has(`${family}-${competency.name}`)}
                        onToggle={() => toggleCompetency(`${family}-${competency.name}`)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {selectedLevel === null && competencyTypeFilter === 'common' && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Please select a career level to view common competencies.</p>
            </div>
          )}

          {Object.values(filteredCompetencies).every((arr: any) => 
            Array.isArray(arr) ? arr.length === 0 : Object.keys(arr).length === 0
          ) && !(selectedLevel === null && competencyTypeFilter === 'common') && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No competencies match your search criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-900 to-amber-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Advance Your Career?</h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Use this matrix as a guide for your professional development. Discuss your competency goals with your manager and create a personalized growth plan.
          </p>
          <Button className="bg-white text-red-900 hover:bg-amber-50">
            Download Your Development Plan
          </Button>
        </div>
      </section>
    </div>
  );
}
