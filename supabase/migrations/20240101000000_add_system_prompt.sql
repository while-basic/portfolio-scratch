-- Add system_prompt column to conversations table
ALTER TABLE conversations ADD COLUMN system_prompt text;
