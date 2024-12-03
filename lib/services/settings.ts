import { supabase } from '../supabase';

export interface Settings {
  id: number;
  category: string;
  key: string;
  value: string;
  data_type: 'string' | 'number' | 'boolean' | 'json';
}

export const settingsService = {
  async getAll() {
    const { data, error } = await supabase
      .from('settings')
      .select('*');

    if (error) throw error;
    return data;
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('category', category);

    if (error) throw error;
    return data;
  },

  async update(key: string, value: any) {
    const { data, error } = await supabase
      .from('settings')
      .update({ value: JSON.stringify(value) })
      .eq('key', key)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateBulk(settings: { key: string; value: any }[]) {
    const { data, error } = await supabase
      .from('settings')
      .upsert(
        settings.map(s => ({
          key: s.key,
          value: JSON.stringify(s.value)
        }))
      )
      .select();

    if (error) throw error;
    return data;
  },

  // Helper method to parse settings into a more usable format
  parseSettings(settings: Settings[]) {
    return settings.reduce((acc, setting) => {
      let value = setting.value;
      try {
        switch (setting.data_type) {
          case 'boolean':
            value = value.toLowerCase() === 'true';
            break;
          case 'number':
            value = Number(value);
            break;
          case 'json':
            value = JSON.parse(value);
            break;
        }
      } catch (e) {
        console.error(`Error parsing setting ${setting.key}:`, e);
      }
      
      return {
        ...acc,
        [setting.key]: value
      };
    }, {} as Record<string, any>);
  }
};
