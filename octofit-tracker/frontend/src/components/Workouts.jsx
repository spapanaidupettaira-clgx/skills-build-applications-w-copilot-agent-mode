import { CollectionStatus, useCollection } from './useCollection.jsx'

function Workouts() {
  const { items, status, error } = useCollection('workouts')

  return <section><header className="page-heading"><p className="eyebrow">Recommended sessions</p><h1>Workouts</h1><p>Find a focused routine that fits your energy, goals, and schedule.</p></header>
    {status !== 'success' || !items.length ? <CollectionStatus status={status} error={error} isEmpty={!items.length} noun="workouts" /> :
      <div className="content-grid workout-grid">{items.map((item) => <article className="content-card workout-card" key={item._id || item.title}><div className="card-meta"><span>{item.category}</span><span>{item.durationMinutes} min</span></div><h2>{item.title}</h2><p>{item.description}</p><strong>{item.difficulty}</strong></article>)}</div>}
  </section>
}

export default Workouts