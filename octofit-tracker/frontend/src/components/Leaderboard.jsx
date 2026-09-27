import { CollectionStatus, referenceName, useCollection } from './useCollection.jsx'

function Leaderboard() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : undefined
  const { items, status, error } = useCollection('leaderboard', endpoint)

  return <section><header className="page-heading"><p className="eyebrow">Season standings</p><h1>Leaderboard</h1><p>See who is setting the pace and earning the most activity points.</p></header>
    {status !== 'success' || !items.length ? <CollectionStatus status={status} error={error} isEmpty={!items.length} noun="leaderboard entries" /> :
      <div className="leaderboard-list">{items.map((item, index) => <article className="leaderboard-row" key={item._id || item.rank || index}><div className="rank" aria-label={`Rank ${item.rank || index + 1}`}>{item.rank || index + 1}</div><div><h2>{referenceName(item.user, 'Unknown athlete')}</h2><p>{referenceName(item.team, 'Independent')}</p></div><strong>{item.points ?? 0} pts</strong></article>)}</div>}
  </section>
}

export default Leaderboard