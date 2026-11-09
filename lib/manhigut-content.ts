/**
 * Bibliografia externa (Mekorot Acharonim) não é exibida no portal:
 * o Rav orienta obras de aprofundamento pessoalmente, após a formação.
 */
const MEKOROT_ACHARONIM_SECTION_RE =
  /(?:\n---\s*)?\n## Mekorot Acharonim[^\n]*\n[\s\S]*?(?=\n## )/g

export function stripMekorotAcharonimFromManhigut(content: string): string {
  return content.replace(MEKOROT_ACHARONIM_SECTION_RE, '\n')
}

/**
 * Prepara markdown Manhigut para exibição no portal.
 * Remove saudações fixas do texto: o site exibe saudação dinâmica por horário.
 */
export function prepareManhigutMarkdownForDisplay(content: string): string {
  return stripMekorotAcharonimFromManhigut(
    content
      .replace(/\r\n/g, '\n')
      .replace(/^## Boker Tov!\s*\n+/m, '')
      .replace(/^## Shalom U'Vrachá,\s*\n+/m, '')
      .trimStart(),
  )
}
