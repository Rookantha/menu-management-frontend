import { NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = process.env.BACKEND_URL || "http://menu-management.us-east-1.elasticbeanstalk.com/menu";

export async function GET() {
  const res = await axios.get(BASE_URL);
  return NextResponse.json(res.data);
}

export async function POST(req: Request) {
  const data = await req.json();
  const res = await axios.post(BASE_URL, data);
  return NextResponse.json(res.data);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await axios.delete(`${BASE_URL}/${id}`);
  return NextResponse.json({ success: true });
}
