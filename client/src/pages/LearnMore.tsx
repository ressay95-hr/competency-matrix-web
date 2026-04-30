import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * Learn More Page - Detailed Competency Framework Overview
 * 
 * This page provides comprehensive information about the competency model,
 * including the framework overview, competency definitions, and advancement pathways.
 */

export default function LearnMore() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Competency Framework Overview</h1>
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back to Matrix
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-16">
        {/* Section 1: Framework Overview */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-red-900 mb-6">Understanding Our Competency Framework</h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Our competency framework is designed to provide clear guidance on the skills, behaviors, and expertise required at each level of our organization. It serves as a roadmap for professional development and career advancement.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                The framework is built on three pillars: Core Competencies that apply to all employees, Common Competencies specific to each career level, and Technical-Functional Competencies tailored to each department.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                By understanding these competencies and their behavioral indicators, employees can identify development areas, set meaningful goals, and work towards career advancement with clarity and purpose.
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-100 to-amber-100 rounded-lg p-8 border-2 border-red-200">
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-4 border-l-4 border-red-900">
                  <h3 className="font-bold text-red-900 mb-2">4 Career Levels</h3>
                  <p className="text-sm text-gray-700">From Entry Level to Top Management, each with distinct requirements</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-amber-600">
                  <h3 className="font-bold text-amber-900 mb-2">3 Competency Types</h3>
                  <p className="text-sm text-gray-700">Core, Common, and Technical-Functional competencies</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-red-700">
                  <h3 className="font-bold text-red-900 mb-2">8 Departments</h3>
                  <p className="text-sm text-gray-700">Specialized technical competencies for each function</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The Three Pillars */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">The Three Pillars of Our Framework</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Core Competencies */}
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8">
              <div className="w-12 h-12 bg-red-900 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-red-900 mb-4">Core Competencies</h3>
              <p className="text-gray-700 mb-4">
                Essential skills and behaviors required for success at every level and in every role across the organization.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Communication & Influence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Collaboration & Teamwork</span>
                </li>
              </ul>
              <p className="text-xs text-gray-600 mt-4 italic">
                These competencies form the foundation for all professional interactions and relationships.
              </p>
            </div>

            {/* Common Competencies */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-8">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4">Common Competencies</h3>
              <p className="text-gray-700 mb-4">
                Competencies that are specific to each career level, building progressively as employees advance.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Level-specific skill requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Progressive responsibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>Leadership development</span>
                </li>
              </ul>
              <p className="text-xs text-gray-600 mt-4 italic">
                These competencies define what success looks like at each career stage.
              </p>
            </div>

            {/* Technical-Functional Competencies */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Technical-Functional Competencies</h3>
              <p className="text-gray-700 mb-4">
                Specialized expertise and technical skills required for specific departments and job families.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 font-bold">•</span>
                  <span>Department-specific expertise</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 font-bold">•</span>
                  <span>Technical skill progression</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-600 font-bold">•</span>
                  <span>Role-specific mastery</span>
                </li>
              </ul>
              <p className="text-xs text-gray-600 mt-4 italic">
                These competencies ensure excellence in your specific function.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Career Progression */}
        <section className="mb-20 bg-gradient-to-r from-red-900 to-amber-900 text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-8">Your Career Progression Path</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                level: 'Entry Level',
                focus: 'Foundation Building',
                description: 'Master core competencies and develop technical skills under guidance. Focus on learning, following procedures, and building expertise.',
                skills: ['Basic technical skills', 'Following procedures', 'Team contribution', 'Learning mindset']
              },
              {
                level: 'Supervisory Level',
                focus: 'Skill Mastery',
                description: 'Develop independence, take initiative, and begin mentoring others. Demonstrate mastery of technical skills and continuous learning.',
                skills: ['Technical mastery', 'Initiative', 'Continuous learning', 'Mentoring basics']
              },
              {
                level: 'Middle Management',
                focus: 'Leadership Development',
                description: 'Lead teams, drive improvement, and make strategic decisions. Balance technical expertise with people management.',
                skills: ['Team leadership', 'Problem solving', 'Strategic thinking', 'Coaching others']
              },
              {
                level: 'Top Management',
                focus: 'Strategic Vision',
                description: 'Shape organizational strategy, drive culture, and manage organizational performance. Think strategically and lead with vision.',
                skills: ['Strategic vision', 'Organizational impact', 'Conflict management', 'Results orientation']
              }
            ].map((stage, index) => (
              <div key={index} className="bg-white/10 backdrop-blur rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2 opacity-50">{index + 1}</div>
                <h3 className="text-lg font-bold mb-2">{stage.level}</h3>
                <p className="text-sm text-amber-100 mb-3 font-semibold">{stage.focus}</p>
                <p className="text-sm mb-4 leading-relaxed">{stage.description}</p>
                <ul className="space-y-1 text-xs">
                  {stage.skills.map((skill, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-300">✓</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Behavioral Indicators */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Understanding Behavioral Indicators</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded">
            <p className="text-gray-700 leading-relaxed">
              Each competency is defined by behavioral indicators—observable actions and outcomes that demonstrate mastery at each level. 
              These indicators help you understand exactly what success looks like and provide clear targets for development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">What Are Behavioral Indicators?</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-red-900 font-bold">→</span>
                  <span className="text-gray-700">Specific, observable behaviors that demonstrate competency mastery</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-900 font-bold">→</span>
                  <span className="text-gray-700">Clear examples of what success looks like at each level</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-900 font-bold">→</span>
                  <span className="text-gray-700">Measurable criteria for performance evaluation</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-900 font-bold">→</span>
                  <span className="text-gray-700">Development targets for career advancement</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">How to Use Them</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-amber-600 font-bold">1.</span>
                  <span className="text-gray-700">Review the indicators for your current level</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 font-bold">2.</span>
                  <span className="text-gray-700">Assess your current performance against each indicator</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 font-bold">3.</span>
                  <span className="text-gray-700">Identify gaps and development areas</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600 font-bold">4.</span>
                  <span className="text-gray-700">Create action plans to close gaps and advance</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: CTA */}
        <section className="text-center py-12 bg-red-50 rounded-lg border-2 border-red-200">
          <h2 className="text-2xl font-bold text-red-900 mb-4">Ready to Develop Your Competencies?</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Return to the competency matrix to explore your current level's requirements and start planning your development journey.
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-red-900 hover:bg-red-800 text-white"
          >
            Explore the Competency Matrix
          </Button>
        </section>
      </main>
    </div>
  );
}
