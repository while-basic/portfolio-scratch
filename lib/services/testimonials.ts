import { supabase } from '../supabase';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  date: string;
  featured: boolean;
  linkedIn?: string;
  image_url?: string;
}

export const testimonialService = {
  async getAll() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return data;
  },

  async create(testimonial: Omit<Testimonial, 'id' | 'date'>) {
    const { data, error } = await supabase
      .from('testimonials')
      .insert([{ ...testimonial, date: new Date().toISOString() }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: number, testimonial: Partial<Testimonial>) {
    const { data, error } = await supabase
      .from('testimonials')
      .update(testimonial)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async toggleFeatured(id: number, featured: boolean) {
    const { data, error } = await supabase
      .from('testimonials')
      .update({ featured })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async uploadImage(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `testimonials/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
};
