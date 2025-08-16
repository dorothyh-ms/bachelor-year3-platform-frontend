// src/utils/colorForId.ts
export function colorForId(id: string): string {
    // Simple hash -> HSL
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue} 75% 60%)`;
}
