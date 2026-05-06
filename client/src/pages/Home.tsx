'use client';
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

  // Get common competencies for selected level
  const getCommonCompetencies = () => {
    if (!selectedLevel) return [];
    return (competencyData.common_competencies as any)[selectedLevel.toString()] || [];
  };

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
      {/* Header with Logo */}
      <header className="bg-gradient-to-r from-amber-900 to-amber-950 text-white shadow-lg sticky top-0 z-50">
        <div className="w-full px-4 py-4 flex items-center justify-center">
          <div className="flex items-center gap-6 max-w-6xl w-full">
            <img src="/manus-storage/al-esraa-logo_6ecd8cd1.png" alt="AL-ESRAA Logo" className="h-20 w-auto flex-shrink-0" />
            <div className="flex-1">
              <h1 className="text-4xl font-bold">Competency Matrix</h1>
              <p className="text-amber-100 text-base">AL-ESRAA Pharmaceuticals - Employee Development & Career Advancement Guide</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 py-20 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-5xl font-bold mb-6 leading-tight">Your Path to Excellence</h2>
            <p className="text-xl text-amber-100 mb-8 leading-relaxed">
              Discover the competencies that define success at every level of our organization. 
              This matrix outlines the skills, behaviors, and expertise required to advance your career 
              and achieve your professional goals.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-amber-900 hover:bg-amber-50 font-semibold"
              onClick={() => document.getElementById('core-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore the Matrix
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search competencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {(['all', 'core', 'common', 'technical'] as const).map((filter) => (
                <Button
                  key={filter}
                  variant={competencyTypeFilter === filter ? 'default' : 'outline'}
                  size="sm"
              onClick={() => setCompetencyTypeFilter(filter)}
              className={competencyTypeFilter === filter ? 'bg-amber-900 hover:bg-amber-950' : ''}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies Section */}
      <section id="core-section" className="py-12 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 flex items-center gap-2">
            <span className="bg-amber-900 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">1</span>
            Core Competencies (All Employees)
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">These fundamental competencies apply to all employees across all levels and are essential for success in any role at AL-ESRAA.</p>
          
          {/* Level Definitions */}
          <div className="mb-12 grid md:grid-cols-4 gap-4">
            <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4">
              <h4 className="font-bold text-amber-900 mb-2">Level 1</h4>
              <p className="text-sm text-amber-800">Entry Level</p>
            </div>
            <div className="bg-amber-100 border-2 border-amber-400 rounded-lg p-4">
              <h4 className="font-bold text-amber-950 mb-2">Level 2</h4>
              <p className="text-sm text-amber-900">Supervisory Level</p>
            </div>
            <div className="bg-amber-200 border-2 border-amber-500 rounded-lg p-4">
              <h4 className="font-bold text-amber-950 mb-2">Level 3</h4>
              <p className="text-sm text-amber-900">Middle Management</p>
            </div>
            <div className="bg-amber-900 border-2 border-amber-950 rounded-lg p-4">
              <h4 className="font-bold text-white mb-2">Level 4</h4>
              <p className="text-sm text-amber-100">Top Management</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {(competencyTypeFilter === 'all' || competencyTypeFilter === 'core') && filteredCompetencies.core && filteredCompetencies.core.length > 0 ? (
              filteredCompetencies.core.map((comp: any) => (
                <CompetencyCard
                  key={comp.name}
                  competency={comp}
                  type="core"
                  isExpanded={expandedCompetencies.has(comp.name)}
                  onToggle={() => toggleCompetency(comp.name)}
                />
              ))
            ) : (competencyTypeFilter === 'core' || searchQuery) ? (
              <p className="text-gray-500 col-span-2">No core competencies match your search.</p>
            ) : null}
          </div>
        </div>
      </section>

      {/* Common Competencies Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 flex items-center gap-2">
            <span className="bg-amber-900 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">2</span>
            Common Competencies by Level
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">Each career level requires specific common competencies. Select your level to see the competencies required for advancement.</p>
          
          <LevelVisualization
            levels={competencyData.levels}
            selectedLevel={selectedLevel}
            onSelectLevel={setSelectedLevel}
          />

          {(competencyTypeFilter === 'all' || competencyTypeFilter === 'common') && selectedLevel && (
            <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-bold text-amber-800 mb-2">{competencyData.levels.find(l => l.id === selectedLevel)?.name} - Common Competencies</h3>
              <p className="text-gray-600 mb-8">These competencies are specific to the {competencyData.levels.find(l => l.id === selectedLevel)?.name.toLowerCase()} and are critical for success at this career stage.</p>
              <div className="grid md:grid-cols-2 gap-6">
                {filteredCompetencies.common && filteredCompetencies.common.length > 0 ? (
                  filteredCompetencies.common.map((comp: any) => (
                    <CompetencyCard
                      key={comp.name}
                      competency={comp}
                      type="common"
                      isExpanded={expandedCompetencies.has(comp.name)}
                      onToggle={() => toggleCompetency(comp.name)}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 col-span-2">No common competencies match your search.</p>
                )}
              </div>
            </div>
          )}
          {!selectedLevel && (competencyTypeFilter === 'all' || competencyTypeFilter === 'common') && (
            <p className="text-gray-500 mt-8">Select a level above to view common competencies.</p>
          )}
        </div>
      </section>

      {/* Technical-Functional Competencies Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 flex items-center gap-2">
            <span className="bg-amber-900 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">3</span>
            Technical-Functional Competencies by Department
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl">These specialized competencies are tailored to specific departments and job families. Each department has unique technical requirements for career progression.</p>

          <div className="space-y-12">
            {(competencyTypeFilter === 'all' || competencyTypeFilter === 'technical') && Object.entries(filteredCompetencies.technical || {}).map(([department, competencies]: any) => (
              <div key={department} className="border-l-4 border-amber-900 pl-6">
                <h3 className="text-2xl font-bold text-amber-800 mb-6">{department}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {competencies.map((comp: any) => (
                    <CompetencyCard
                      key={`${department}-${comp.name}`}
                      competency={comp}
                      type="technical"
                      isExpanded={expandedCompetencies.has(`${department}-${comp.name}`)}
                      onToggle={() => toggleCompetency(`${department}-${comp.name}`)}
                    />
                  ))}
                </div>
              </div>
            ))}
            {(competencyTypeFilter === 'all' || competencyTypeFilter === 'technical') && Object.entries(filteredCompetencies.technical || {}).length === 0 && searchQuery && (
              <p className="text-gray-500">No technical competencies match your search.</p>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-amber-900 to-amber-950 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Advance Your Career?</h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Use this competency matrix as a guide to develop your skills and prepare for the next level. 
            Discuss your development plan with your manager to create a personalized growth strategy.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-amber-900 hover:bg-amber-50 font-semibold"
            onClick={() => window.location.href = '/learn-more'}
          >
            Learn More About the Framework
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container text-center">
          <p>&copy; 2026 AL-ESRAA Pharmaceuticals. All rights reserved.</p>
          <p className="text-sm mt-2">This competency matrix is a tool for employee development and career planning.</p>
        </div>
      </footer>
    </div>
  );
}
