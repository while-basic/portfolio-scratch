-- Remove conflicting table creation and keep only the likes functionality
CREATE TABLE IF NOT EXISTS public.image_likes (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    image_id uuid NOT NULL REFERENCES public.ai_gallery(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(image_id, user_id)
);

-- Add RLS policies for image_likes
ALTER TABLE public.image_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all likes"
    ON public.image_likes
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can insert their own likes"
    ON public.image_likes
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes"
    ON public.image_likes
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Create function to increment likes
CREATE OR REPLACE FUNCTION public.increment_likes(image_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.ai_gallery
  SET likes = likes + 1
  WHERE id = image_id;
END;
$$;

-- Create function to decrement likes
CREATE OR REPLACE FUNCTION public.decrement_likes(image_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.ai_gallery
  SET likes = greatest(0, likes - 1)
  WHERE id = image_id;
END;
$$;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.image_likes TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_likes TO authenticated;
GRANT EXECUTE ON FUNCTION public.decrement_likes TO authenticated;
  