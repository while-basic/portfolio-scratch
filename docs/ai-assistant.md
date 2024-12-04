## Specific Recommendations for AI Assistants

1. Code Generation: Best Practices

	•	Provide Context and Clear Implementation
	•	Generate code with well-structured, functional logic that aligns with industry standards.
	•	Include meaningful variable names, comments, and appropriate error handling.

// ✅ Good: Clear implementation with detailed logic
function generateUserProfile(user: User): UserProfile {
  if (!user || !user.id || !user.name) {
    throw new Error("Invalid user data provided.");
  }
  
  return {
    id: user.id,
    name: user.name,
    email: user.email || "No email provided", // Add defaults
    createdAt: new Date().toISOString(),     // Include additional fields
  };
}

	•	Avoid Vague or Incomplete Implementations
	•	Do not generate functions with missing logic, poor naming conventions, or incomplete functionality.

// ❌ Avoid: Incomplete or unclear implementations
function badGenerateProfile(user: any) {
  // Missing return type and logic
}

2. Provide Options

	•	When generating code, offer alternative solutions and explain trade-offs (e.g., performance vs. readability).

// Option 1: Functional approach for immutable data
const generateUserProfile = (user: User): UserProfile => ({
  id: user.id,
  name: user.name.trim(),
  email: user.email?.toLowerCase() ?? "default@example.com",
});

// Option 2: Class-based approach for object-oriented systems
class UserProfileGenerator {
  static generate(user: User): UserProfile {
    return {
      id: user.id,
      name: user.name.trim(),
      email: user.email?.toLowerCase() || "default@example.com",
    };
  }
}

3. Error Handling

	•	Include robust error handling to ensure the AI-generated code works reliably.

// ✅ Good: Error handling included
function generateUserProfile(user: User): UserProfile {
  if (!user) {
    throw new Error("User object cannot be null.");
  }

  const { id, name, email } = user;
  if (!id || !name) {
    throw new Error("User must have an id and name.");
  }

  return {
    id,
    name: name.trim(),
    email: email?.toLowerCase() ?? "No email provided",
  };
}

// ❌ Avoid: Missing error handling
function generateUserProfile(user: any): UserProfile {
  return {
    id: user.id,
    name: user.name,
  }; // Fails silently on invalid input
}

4. Commenting Standards

	•	Provide inline comments to clarify logic for generated code.
	•	Avoid over-commenting obvious details.

// ✅ Good: Relevant and concise comments
function generateUserProfile(user: User): UserProfile {
  if (!user) throw new Error("User object is required.");

  // Ensure essential fields are present
  const { id, name, email } = user;
  if (!id || !name) throw new Error("Missing essential user fields.");

  // Return formatted user profile
  return {
    id,
    name: name.trim(), // Trim whitespace
    email: email?.toLowerCase() ?? "No email provided",
  };
}

5. Follow Standards

	•	Use the latest TypeScript/JavaScript conventions (e.g., ES6+ syntax).
	•	Prefer immutability and functional programming principles unless explicitly instructed otherwise.