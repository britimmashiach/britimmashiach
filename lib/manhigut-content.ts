/**
 * Prepara markdown Manhigut para exibição no portal.
 * Remove saudações fixas do texto: o site exibe saudação dinâmica por horário.
 */
export function prepareManhigutMarkdownForDisplay(content: string): string {
  return content
    .replace(/\r\n/g, '\n')
    .replace(/^## Boker Tov!\s*\n+/m, '')
    .replace(/^## Shalom U'Vrachá,\s*\n+/m, '')
    .trimStart()
}
