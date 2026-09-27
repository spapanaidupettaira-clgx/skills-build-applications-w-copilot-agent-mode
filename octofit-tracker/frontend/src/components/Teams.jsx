import { CollectionStatus, useCollection } from './useCollection.jsx'

function Teams() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : undefined
  const { items, status, error } = useCollection('teams', endpoint)

  return <section><header className="page-heading"><p className="eyebrow">Train together</p><h1>Teams</h1><p>Meet the groups turning everyday movement into shared momentum.</p></header>
    {status !== 'success' || !items.length ? <CollectionStatus status={status} error={error} isEmpty={!items.length} noun="teams" /> :
      <div className="content-grid">{items.map((item) => <article className="content-card team-card" key={item._id || item.name} style={{ '--team-color': item.color || '#176b5b' }}><span className="team-mark" aria-hidden="true" /><h2>{item.name}</h2><p>{item.members?.length || 0} members</p></article>)}</div>}
  </section>
}

export default Teams