export function formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('sv-SE', { timeZone: 'Asia/Kolkata' });
}