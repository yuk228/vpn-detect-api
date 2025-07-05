import asnList from "@/public/asn.json";

export async function isVpn(asn: number): Promise<boolean> {
  return asnList.includes(asn);
}
