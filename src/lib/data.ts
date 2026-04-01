import { kv } from "@vercel/kv";
import type { TeamMember } from "@/data/types";

// In dev, or when KV isn't configured, fall back to local JSON
import bharathData from "@/data/bharath";

const LOCAL_MEMBERS: Record<string, TeamMember> = {
  bharath: bharathData,
};

function isKVConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

/**
 * Get a team member's profile.
 * Reads from Vercel KV in production, local JSON in dev.
 */
export async function getMember(slug: string): Promise<TeamMember | null> {
  if (isKVConfigured()) {
    try {
      const member = await kv.get<TeamMember>(`member:${slug}`);
      if (member) return member;
    } catch {
      // KV failed, fall through to local
    }
  }

  return LOCAL_MEMBERS[slug] ?? null;
}

/**
 * Get all team member slugs.
 */
export async function getAllSlugs(): Promise<string[]> {
  if (isKVConfigured()) {
    try {
      const keys = await kv.keys("member:*");
      return keys.map((k) => k.replace("member:", ""));
    } catch {
      // fall through
    }
  }

  return Object.keys(LOCAL_MEMBERS);
}

/**
 * Save a team member's profile to KV.
 */
export async function saveMember(member: TeamMember): Promise<void> {
  if (!isKVConfigured()) {
    throw new Error("Vercel KV is not configured. Set KV_REST_API_URL and KV_REST_API_TOKEN.");
  }
  await kv.set(`member:${member.slug}`, member);

  // Also maintain a set of all slugs for listing
  const slugs = await kv.get<string[]>("member:__slugs") ?? [];
  if (!slugs.includes(member.slug)) {
    slugs.push(member.slug);
    await kv.set("member:__slugs", slugs);
  }
}

/**
 * Delete a team member from KV.
 */
export async function deleteMember(slug: string): Promise<void> {
  if (!isKVConfigured()) {
    throw new Error("Vercel KV is not configured.");
  }
  await kv.del(`member:${slug}`);

  const slugs = await kv.get<string[]>("member:__slugs") ?? [];
  await kv.set("member:__slugs", slugs.filter((s) => s !== slug));
}
