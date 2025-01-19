import Redis from 'ioredis';

if (!process.env.REDIS_URL) {
  throw new Error('REDIS_URL is not defined in environment variables');
}

// Initialize Redis client
const redis = new Redis(process.env.REDIS_URL);

// OTP expiration time in seconds (5 minutes)
const OTP_EXPIRATION = 300;

export async function storeOTP(nationalId: string, otp: string): Promise<void> {
  await redis.set(`otp:${nationalId}`, otp, 'EX', OTP_EXPIRATION);
}

export async function verifyOTP(
  nationalId: string,
  submittedOTP: string,
): Promise<boolean> {
  const storedOTP = await redis.get(`otp:${nationalId}`);

  if (!storedOTP) {
    return false; // OTP expired or not found
  }

  // Verify OTP and delete it if correct (one-time use)
  if (storedOTP === submittedOTP) {
    await redis.del(`otp:${nationalId}`);
    return true;
  }

  return false;
}

export async function deleteOTP(nationalId: string): Promise<void> {
  await redis.del(`otp:${nationalId}`);
}

// Handle Redis errors
redis.on('error', (error) => {
  console.error('Redis Error:', error);
});
