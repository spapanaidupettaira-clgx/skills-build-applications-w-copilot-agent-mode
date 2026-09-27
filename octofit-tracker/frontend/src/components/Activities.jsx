import { CollectionStatus, referenceName, useCollection } from './useCollection.jsx'

function Activities() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : undefined
  const { items, status, error } = useCollection('activities', endpoint)

  return <section><header className="page-heading"><p className="eyebrow">Movement log</p><h1>Activities</h1><p>Recent workouts, duration, and points earned across every team.</p></header>
    {status !== 'success' || !items.length ? <CollectionStatus status={status} error={error} isEmpty={!items.length} noun="activities" /> :
      <div className="table-responsive data-panel"><table className="table align-middle mb-0"><thead><tr><th>Activity</th><th>Athlete</th><th>Duration</th><th>Points</th><th>Completed</th></tr></thead><tbody>{items.map((item) =>
        <tr key={item._id || `${item.type}-${item.completedAt}`}><td className="fw-semibold">{item.type}</td><td>{referenceName(item.user)}</td><td>{item.durationMinutes} min</td><td><span className="points">+{item.points}</span></td><td>{item.completedAt ? new Date(item.completedAt).toLocaleDateString() : 'Not recorded'}</td></tr>
      )}</tbody></table></div>}
  </section>
}

export default Activities