import { NextRequest, NextResponse } from "next/server";
import { isVpn } from "@/lib/isVpn";
import { isValidIPv4 } from "@/lib/ipValidate";

export async function GET(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "";
  if (!isValidIPv4(ip)) {
    return NextResponse.json({ error: "invalid ip address" }, { status: 400 });
  }
  const vpnCheck = await isVpn(ip);
  if (!vpnCheck) {
    return NextResponse.json({
      ip,
      isVpn: false,
    });
  }

  return NextResponse.json({
    ip,
    isVpn: true,
  });
}
