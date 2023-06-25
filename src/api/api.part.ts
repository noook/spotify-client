import type { $Fetch } from 'ofetch'

export abstract class ApiPart {
  public constructor(protected $fetch: $Fetch) {}
}
