import { TeamMember } from "./types";
import bharath from "./bharath";

const teamMembers: Record<string, TeamMember> = {
  bharath,
};

export function getTeamMember(slug: string): TeamMember | undefined {
  return teamMembers[slug];
}

export function getAllSlugs(): string[] {
  return Object.keys(teamMembers);
}
