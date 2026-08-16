import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import BlogModel from "@/models/Blog";
import { slugify } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true"; // admin: fetch all
    const query = all ? {} : { published: true };
    const blogs = await BlogModel.find(query).sort({ created_at: -1 }).lean();
    return NextResponse.json({ blogs });
  } catch {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await dbConnect();
    const body = await req.json();
    if (!body.slug) body.slug = slugify(body.title);
    const blog = await BlogModel.create(body);
    return NextResponse.json({ blog }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create blog";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
