# Escola Rav EBBY, cursos sequenciais e colação

## Cursos (ordem para líderes)

1. **Avodat HaNefesh** (7 módulos)
2. **Manhigut** (24 etapas) → ao colar a última etapa: diploma **Talmid Manhig** e `formacao_concluida`
3. **IECL Cura** (5 fases)
4. **IECL Libertação** (4 etapas)

## Fluxo

1. Líder responde o questionário em `/lideres/escola`.
2. Nota mínima 70%: entra na fila `escola_colacao_queue`.
3. Admin vê faixa no topo do site e em `/admin#escola-colacao`.
4. **Concordo com a colação** libera a próxima etapa ou conclui o curso.
5. Diploma PDF: `sendEscolaDiplomaEmailAction` (admin) após registro em `escola_diplomas`.

## Deploy / banco

```bash
npm run apply:escola-migration
npm run seed:escola
```

## Próximos passos sugeridos

- Enviar diploma pela UI admin (lista `escola_diplomas` ao aprovar curso completo).
- Questionários autorais por etapa (hoje: modelo padrão por tema).
- Desativar progresso só por `leader_since` em `/lideres/formacao` quando a migração estiver estável.
