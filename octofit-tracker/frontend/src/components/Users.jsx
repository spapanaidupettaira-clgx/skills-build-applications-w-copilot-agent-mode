import { CollectionStatus, useCollection } from './useCollection.jsx'

function Users() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : undefined
  const { items, status, error } = useCollection('users', endpoint)

  return <section><header className="page-heading"><p className="eyebrow">The community</p><h1>Users</h1><p>Browse OctoFit athletes and their current training levels.</p></header>
    {status !== 'success' || !items.length ? <CollectionStatus status={status} error={error} isEmpty={!items.length} noun="users" /> :
      <div className="content-grid">{items.map((item) => <article className="content-card user-card" key={item._id || item.email}><div className="avatar">{item.avatar || item.name?.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div><div><h2>{item.name}</h2><p>{item.email}</p></div><span className="level">Level {item.level}</span></article>)}</div>}
  </section>
}

export default Users