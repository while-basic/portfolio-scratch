import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    location: '',
    occupation: '',
    website: '',
    bio: '',
  });
  const { toast } = useToast();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to view or edit your profile",
          variant: "destructive",
        });
        return;
      }

      let { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            first_name: '',
            last_name: '',
            phone: '',
            location: '',
            occupation: '',
            website: '',
            bio: '',
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (createError) {
          throw createError;
        }

        profile = newProfile;
      } else if (error) {
        throw error;
      }

      setProfile(profile || {});
    } catch (error) {
      console.error('Profile error:', error.message);
      toast({
        title: "Error",
        description: "Failed to load profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const updateProfile = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to update your profile",
          variant: "destructive",
        });
        return;
      }

      const updates = {
        ...profile,
        id: user.id,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
      
      await getProfile(); // Refresh profile data
    } catch (error) {
      console.error('Update error:', error.message);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <Input
              name="first_name"
              value={profile.first_name || ''}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <Input
              name="last_name"
              value={profile.last_name || ''}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <Input
            name="phone"
            value={profile.phone || ''}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <Input
            name="location"
            value={profile.location || ''}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Occupation</label>
          <Input
            name="occupation"
            value={profile.occupation || ''}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Website</label>
          <Input
            name="website"
            value={profile.website || ''}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <Textarea
            name="bio"
            value={profile.bio || ''}
            onChange={handleChange}
            rows={4}
            disabled={loading}
          />
        </div>

        <Button
          onClick={updateProfile}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
