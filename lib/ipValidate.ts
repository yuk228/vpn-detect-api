export function isValidIPv4(ip: string): boolean {
  const IPV4_REGEX =
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (!IPV4_REGEX.test(ip)) return false;

  const octets = ip.split(".");
  return octets.every((octet) => {
    return octet === "0" || !octet.startsWith("0");
  });
}
