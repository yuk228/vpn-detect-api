import asnList from "@/lib/asn.json";

export async function getASN(ip: string): Promise<number | null> {
  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json`);
    if (!response.ok) {
      console.error("Failed to fetch ASN");
      return null;
    }
    const data = await response.json();
    const match = data.org?.match(/AS(\d+)/);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    console.error("No ASN found");
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function isVpn(ip: string): Promise<boolean> {
  const asn = await getASN(ip);
  if (!asn) return false;
  return asnList.includes(asn);
}
