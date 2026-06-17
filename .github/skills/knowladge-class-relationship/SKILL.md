---
name: knowladge-class-relationship
description: "Guide the user through implementing a TypeORM join query for `knowladge.className` and `class.id` in `getKnowladgeList`."
user-invocable: true
---

# `knowladge.className` -> `class.id` Join Query

## When to use
Use this skill when you need to:
- implement or fix the join query for `getKnowladgeList`
- map `knowladge.className` to `class.id` using TypeORM relations
- make `getKnowladgeList` return full `ClassEntity` data instead of just the numeric class ID
- update DTOs and save logic to store the relation correctly

## Workflow
1. Inspect `entity/knowladge.entity.ts` and `entity/class.entity.ts`.
2. Replace the plain numeric `className` column in `KnowladgeEntity` with a proper `@ManyToOne` relation to `ClassEntity`.
3. Optionally add a reciprocal `@OneToMany` relation in `ClassEntity`.
4. Update `src/knowladge/knowladge/knowladge.service.ts` so `add()` saves the class relation object.
5. Update `getKnowladgeList()` to query `KnowladgeEntity` with `relations: ['className']` or a QueryBuilder join.
6. Confirm the response includes the joined `className` entity data.

## Example prompts
- "将 getKnowladgeList 改为联合查询，返回 class 实体"
- "修复 knowladge.className 与 class.id 的 TypeORM 关联查询"
- "让 getKnowladgeList 使用 relations: ['className'] 返回 class 详细信息"
