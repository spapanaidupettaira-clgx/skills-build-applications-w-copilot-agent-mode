import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

export function useCollection(resource) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setStatus('loading')
      setError('')
      try {
        setItems(await fetchCollection(resource, controller.signal))
        setStatus('success')
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
          setStatus('error')
        }
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [resource])

  return { items, status, error }
}

export function CollectionStatus({ status, error, isEmpty, noun }) {
  if (status === 'loading') return <div className="status-message">Loading {noun}...</div>
  if (status === 'error') return <div className="alert alert-danger">Unable to load {noun}: {error}</div>
  if (isEmpty) return <div className="status-message">No {noun} found.</div>
  return null
}

export function referenceName(reference, fallback = 'Not assigned') {
  if (!reference) return fallback
  if (typeof reference === 'object') return reference.name || reference.title || reference.email || reference._id
  return reference
}