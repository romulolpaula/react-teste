export function getInitials(name: string): string {
  // Ignora tratamentos como "Mrs." para que "Mrs. Dennis Schulist" vire "DS".
  const words = name.split(' ').filter((word) => word && !word.endsWith('.'));
  const first = words[0]?.[0] ?? '';
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return (first + last).toUpperCase();
}
