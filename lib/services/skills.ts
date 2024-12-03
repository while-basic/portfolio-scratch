import { supabase } from '../supabase';

export interface Skill {
  id: number;
  name: string;
  proficiency: number;
  years_exp: number;
  featured: boolean;
  category_id: number;
  order: number;
}

export interface SkillCategory {
  id: number;
  name: string;
  order: number;
}

export const skillService = {
  async getCategories() {
    const { data, error } = await supabase
      .from('skill_categories')
      .select('*')
      .order('order');

    if (error) throw error;
    return data;
  },

  async getSkills() {
    const { data, error } = await supabase
      .from('skills')
      .select(`
        *,
        category:skill_categories(*)
      `)
      .order('order');

    if (error) throw error;
    return data;
  },

  async createCategory(category: Omit<SkillCategory, 'id'>) {
    const { data, error } = await supabase
      .from('skill_categories')
      .insert([category])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateCategory(id: number, category: Partial<SkillCategory>) {
    const { data, error } = await supabase
      .from('skill_categories')
      .update(category)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteCategory(id: number) {
    const { error } = await supabase
      .from('skill_categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async createSkill(skill: Omit<Skill, 'id'>) {
    const { data, error } = await supabase
      .from('skills')
      .insert([skill])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateSkill(id: number, skill: Partial<Skill>) {
    const { data, error } = await supabase
      .from('skills')
      .update(skill)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteSkill(id: number) {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async updateSkillOrder(id: number, newOrder: number) {
    const { data, error } = await supabase
      .from('skills')
      .update({ order: newOrder })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async toggleFeatured(id: number, featured: boolean) {
    const { data, error } = await supabase
      .from('skills')
      .update({ featured })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
