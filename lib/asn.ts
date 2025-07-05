export async function getASN(ip: string): Promise<number | null> {
  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json`);
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const match = data.org?.match(/AS(\d+)/);

    if (match && match[1]) {
      return parseInt(match[1], 10);
    }

    return null;
  } catch {
    return null;
  }
}
