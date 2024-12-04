interface RetryConfig {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  shouldRetry?: (error: unknown) => boolean;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    shouldRetry = (error: unknown) => {
      const err = error as { code?: string };
      return err?.code === 'rate_limit_exceeded';
    }
  } = config;

  let lastError: unknown;
  let delay = initialDelay;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (!shouldRetry(error)) {
        throw error;
      }

      if (attempt === maxRetries - 1) {
        throw error;
      }

      // Exponential backoff with jitter
      const jitter = Math.random() * 200;
      await new Promise(resolve => 
        setTimeout(resolve, Math.min(delay + jitter, maxDelay))
      );
      
      delay *= 2;
    }
  }

  throw lastError;
}
