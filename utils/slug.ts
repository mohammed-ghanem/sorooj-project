export function generateSlug(name: string): string {
    return name.replace(/ /g, "_").replace(/\./g, "").toLowerCase()
}