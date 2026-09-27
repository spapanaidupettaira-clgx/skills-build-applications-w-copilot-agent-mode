const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

const codespaceApiUrls = codespaceName
  ? {
      activities: `https://${codespaceName}-8000.app.github.dev/api/activities/`,
      leaderboard: `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`,
      teams: `https://${codespaceName}-8000.app.github.dev/api/teams/`,
      users: `https://${codespaceName}-8000.app.github.dev/api/users/`,
      workouts: `https://${codespaceName}-8000.app.github.dev/api/workouts/`,
    }
  : {}

export function apiUrl(resource) {
  return codespaceApiUrls[resource] ?? `${apiBaseUrl}/${resource}/`
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  return []
}

export async function fetchCollection(resource, signal) {
  const response = await fetch(apiUrl(resource), { signal })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return normalizeCollection(await response.json())
}