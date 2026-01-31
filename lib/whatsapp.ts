export function createWhatsAppMessage(text: string) {
  return `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    text
  )}`;
}
