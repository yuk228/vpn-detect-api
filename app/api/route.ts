import { getASN } from "@/lib/asn";
import { isVpn } from "@/lib/is-vpn";
import { isValidIPv4 } from "@/lib/ip-validate";

export async function GET(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "";

  if (!isValidIPv4(ip)) {
    return new Response(JSON.stringify({ error: "invalid ip address" }), { status: 400 });
  }

  const asn = await getASN(ip);
  if (!asn) {
    return new Response(JSON.stringify({ error: "asn not found" }), { status: 404 });
  }

  const vpnCheck = await isVpn(asn);

  if (!vpnCheck) {
    return new Response(
      JSON.stringify({
        ip,
        isVpn: false,
      })
    );
  }

  return new Response(
    JSON.stringify({
      ip,
      isVpn: true,
    })
  );
}
