# Settings Implementation Guide

## Database Schema

### 1. Site Settings Table
```sql
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name VARCHAR(255) NOT NULL,
  site_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Feature Flags Table
```sql
CREATE TABLE feature_flags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(50) NOT NULL UNIQUE,
  enabled BOOLEAN DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Notification Settings Table
```sql
CREATE TABLE notification_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  email_notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Required API Endpoints

### 1. Get Settings
```typescript
GET /api/admin/settings
Response {
  siteSettings: {
    siteName: string;
    siteDescription: string;
  };
  featureFlags: {
    enableBlog: boolean;
    enableProjects: boolean;
    enableComments: boolean;
  };
  notificationSettings: {
    emailNotifications: boolean;
  };
}
```

### 2. Update Settings
```typescript
PUT /api/admin/settings
Body {
  siteSettings?: {
    siteName?: string;
    siteDescription?: string;
  };
  featureFlags?: {
    enableBlog?: boolean;
    enableProjects?: boolean;
    enableComments?: boolean;
  };
  notificationSettings?: {
    emailNotifications?: boolean;
  };
}
```

## Supabase Implementation Steps

1. Create RLS (Row Level Security) Policies:
```sql
-- Allow only authenticated admin users to read settings
CREATE POLICY "Allow admins to read settings"
ON site_settings
FOR SELECT
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- Allow only authenticated admin users to update settings
CREATE POLICY "Allow admins to update settings"
ON site_settings
FOR UPDATE
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');

-- Similar policies needed for feature_flags and notification_settings tables
```

2. Initial Data Setup:
```sql
-- Insert default site settings
INSERT INTO site_settings (site_name, site_description)
VALUES ('My Portfolio', 'Personal portfolio and blog');

-- Insert default feature flags
INSERT INTO feature_flags (key, enabled, description)
VALUES 
  ('enableBlog', true, 'Enable or disable the blog feature'),
  ('enableProjects', true, 'Enable or disable the projects section'),
  ('enableComments', true, 'Enable or disable comments on blog posts');
```

## Frontend Integration

1. Create API client functions in `lib/api/settings.ts`:
```typescript
export async function getSettings() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateSettings(settings: UpdateSettingsPayload) {
  const { data, error } = await supabase
    .from('site_settings')
    .update(settings)
    .eq('id', settings.id)
    .single();
  
  if (error) throw error;
  return data;
}
```

2. Update the settings page to use these functions:
- Replace the current local state with data from the API
- Implement the TODO in handleSubmit to call the update function
- Add proper error handling and loading states
- Add optimistic updates for better UX

## Security Considerations

1. Ensure proper RLS policies are in place
2. Validate all input on both client and server side
3. Implement rate limiting for API endpoints
4. Log all settings changes for audit purposes
5. Implement proper CORS policies

## Additional Features to Consider

1. Settings history/changelog
2. Backup/restore functionality
3. Environment-specific settings (dev/staging/prod)
4. Settings export/import functionality
5. Multi-language support for site settings

## Testing Requirements

1. Unit tests for API endpoints
2. Integration tests for settings updates
3. E2E tests for settings management flow
4. Performance testing for settings retrieval
5. Security testing for admin-only access

## Monitoring and Maintenance

1. Set up logging for settings changes
2. Monitor settings API performance
3. Regular security audits
4. Backup strategy for settings data
5. Documentation updates as needed
``` 