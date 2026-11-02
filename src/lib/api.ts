const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000').replace(/\/$/, '');

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers,
      credentials: 'include',
      cache: 'no-store',
    });
  } catch (error) {
    throw new Error(
      `Could not connect to the StudioSpace API at ${API_BASE_URL}. Check the API server and NEXT_PUBLIC_API_URL.`,
      { cause: error },
    );
  }

  const responseText = await response.text();
  let payload: unknown;
  if (responseText) {
    try {
      payload = JSON.parse(responseText);
    } catch (error) {
      if (!response.ok) {
        throw new ApiError(`Request failed (${response.status}).`, response.status);
      }
      throw new Error('The StudioSpace API returned invalid JSON.', { cause: error });
    }
  }

  if (!response.ok) {
    const message =
      typeof payload === 'object' &&
      payload !== null &&
      'message' in payload &&
      typeof payload.message === 'string'
        ? payload.message
        : `Request failed (${response.status}).`;
    throw new ApiError(message, response.status);
  }

  return payload as T;
}

export function getApiUser(payload: unknown) {
  if (typeof payload !== 'object' || payload === null) return null;

  const candidate =
    'user' in payload && typeof payload.user === 'object' && payload.user !== null
      ? payload.user
      : payload;

  if (
    !('name' in candidate) ||
    typeof candidate.name !== 'string' ||
    !('email' in candidate) ||
    typeof candidate.email !== 'string'
  ) {
    return null;
  }

  return {
    name: candidate.name,
    email: candidate.email,
    photoUrl:
      'photoUrl' in candidate && typeof candidate.photoUrl === 'string'
        ? candidate.photoUrl
        : undefined,
  };
}

export function getStudioLocation(location: StudioLocation) {
  if (typeof location === 'string') return location;
  return [location.address, location.city].filter(Boolean).join(', ');
}

type StudioLocation = string | { address?: string; city?: string };
