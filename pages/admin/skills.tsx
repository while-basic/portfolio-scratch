import React, { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/admin/protected-route';
import { Wrench, Plus, Edit, Trash2, MoveUp, MoveDown, Loader2 } from 'lucide-react';
import { skillService, type Skill, type SkillCategory } from '@/lib/services/skills';
import { useToast } from "@/components/ui/use-toast";

const Skills = () => {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [categoriesData, skillsData] = await Promise.all([
        skillService.getCategories(),
        skillService.getSkills()
      ]);
      setCategories(categoriesData);
      setSkills(skillsData);
    } catch (error) {
      toast.error('Failed to load skills data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    try {
      await skillService.deleteSkill(id);
      setSkills(skills.filter(s => s.id !== id));
      toast.success('Skill deleted successfully');
    } catch (error) {
      toast.error('Failed to delete skill');
      console.error(error);
    }
  };

  const handleToggleFeatured = async (id: number, featured: boolean) => {
    try {
      await skillService.toggleFeatured(id, !featured);
      setSkills(skills.map(s => 
        s.id === id ? { ...s, featured: !featured } : s
      ));
      toast.success(`Skill ${!featured ? 'featured' : 'unfeatured'} successfully`);
    } catch (error) {
      toast.error('Failed to update skill');
      console.error(error);
    }
  };

  const handleMoveSkill = async (id: number, direction: 'up' | 'down') => {
    const skillIndex = skills.findIndex(s => s.id === id);
    const skill = skills[skillIndex];
    const adjacentSkill = direction === 'up' 
      ? skills[skillIndex - 1] 
      : skills[skillIndex + 1];

    if (!adjacentSkill) return;

    try {
      await Promise.all([
        skillService.updateSkillOrder(skill.id, adjacentSkill.order),
        skillService.updateSkillOrder(adjacentSkill.id, skill.order)
      ]);

      setSkills(skills.map(s => {
        if (s.id === skill.id) return { ...s, order: adjacentSkill.order };
        if (s.id === adjacentSkill.id) return { ...s, order: skill.order };
        return s;
      }).sort((a, b) => a.order - b.order));

      toast.success('Skill order updated');
    } catch (error) {
      toast.error('Failed to update skill order');
      console.error(error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Wrench className="w-6 h-6 mr-2" />
            <h1 className="text-2xl font-bold">Skills</h1>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No skill categories found</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center mx-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Category
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold">{category.name}</h2>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {skills.filter(skill => skill.categoryId === category.id).map((skill) => (
                        <div key={skill.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <h3 className="font-medium">{skill.name}</h3>
                              {skill.featured && (
                                <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                  Featured
                                </span>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-gray-600 hover:text-gray-800">
                                <MoveUp className="w-4 h-4" onClick={() => handleMoveSkill(skill.id, 'up')} />
                              </button>
                              <button className="text-gray-600 hover:text-gray-800">
                                <MoveDown className="w-4 h-4" onClick={() => handleMoveSkill(skill.id, 'down')} />
                              </button>
                              <button className="text-blue-600 hover:text-blue-800">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-800" onClick={() => handleDeleteSkill(skill.id)}>
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="flex-1">
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Proficiency</span>
                                <span>{skill.proficiency}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 rounded-full h-2"
                                  style={{ width: `${skill.proficiency}%` }}
                                />
                              </div>
                            </div>
                            <div className="text-sm text-gray-600">
                              {skill.yearsExp} {skill.yearsExp === 1 ? 'year' : 'years'} exp.
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Skills;
