// Haversine formula to calculate geographical distance in kilometers
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

export function getGoogleMapsDirUrl(lat: number, lng: number, placeName?: string): string {
  const query = placeName ? encodeURIComponent(`${placeName}, Tepus, Gunungkidul`) : `${lat},${lng}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${query}&destination_place_id=`;
}

export function getWhatsAppChatUrl(phone: string, placeName: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const formattedPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
  const text = encodeURIComponent(
    `Halo, saya ingin bertanya mengenai layanan / produk "${placeName}" yang saya temukan melalui Peta Digital Desa Tepus.`
  );
  return `https://wa.me/${formattedPhone}?text=${text}`;
}
