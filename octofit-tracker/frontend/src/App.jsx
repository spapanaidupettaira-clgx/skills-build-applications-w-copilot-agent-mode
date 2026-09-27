import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

function App() {
  const pages = [
    { path: 'activities', label: 'Activities' },
    { path: 'leaderboard', label: 'Leaderboard' },
    { path: 'teams', label: 'Teams' },
    { path: 'users', label: 'Users' },
    { path: 'workouts', label: 'Workouts' },
  ]

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <NavLink className="navbar-brand fw-semibold" to="/activities">
            OctoFit Tracker
          </NavLink>
          <div className="navbar-nav flex-row flex-wrap gap-2">
            {pages.map((page) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active fw-semibold' : ''}`
                }
                key={page.path}
                to={`/${page.path}`}
              >
                {page.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate replace to="/activities" />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate replace to="/activities" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
