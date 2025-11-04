import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Redis কানেকশন তৈরি করা
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// RateLimiter তৈরি করা
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, "5 s"), // ১০ সেকেন্ডে সর্বোচ্চ ৫টা রিকোয়েস্ট
  analytics: true,
});

// export default ratelimit;
