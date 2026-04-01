import { NextRequest, NextResponse } from "next/server";
import { getMember, saveMember, getAllSlugs } from "@/lib/data";
import type { TeamMember } from "@/data/types";

function checkPin(request: NextRequest): boolean {
  const pin = request.headers.get("x-admin-pin");
  return pin === process.env.ADMIN_PIN;
}

// GET /api/members — list all members
// GET /api/members?slug=bharath — get one member
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  if (slug) {
    const member = await getMember(slug);
    if (!member) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(member);
  }

  const slugs = await getAllSlugs();
  const members: TeamMember[] = [];
  for (const s of slugs) {
    const m = await getMember(s);
    if (m) members.push(m);
  }

  return NextResponse.json(members);
}

// POST /api/members — create or update a member
export async function POST(request: NextRequest) {
  if (!checkPin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const member = body as TeamMember;

  if (!member.slug || !member.name) {
    return NextResponse.json({ error: "slug and name are required" }, { status: 400 });
  }

  await saveMember(member);
  return NextResponse.json({ ok: true, slug: member.slug });
}
