import type { SortKey, SortOrder } from '../types';

export default function getParams(params: URLSearchParams) {
  const sort = (params.get('sort') as SortKey) || 'title';
  const order = (params.get('order') as SortOrder) || 'ASC';
  const titleQuery = params.get('title') || undefined;
  const actorQuery = params.get('actor') || undefined;
  const limit = params.get('limit') ? Number(params.get('limit')) : undefined;
  const offset = params.get('offset') ? Number(params.get('offset')) : undefined;

  return { sort, order, titleQuery, actorQuery, limit, offset };
}
