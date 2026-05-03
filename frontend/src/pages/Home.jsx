import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiKey, FiWifi, FiTrash2, FiChevronRight } from 'react-icons/fi'
import { MdSecurity, MdFingerprint } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import SearchBar from '../components/SearchBar'

const Home = () => {
  const categories = [
    { label: 'All',      icon: <FiKey />,             iconBg: 'bg-blue-500',   route: '/all'      },
    { label: 'Passkeys', icon: <MdFingerprint />,      iconBg: 'bg-green-500',  route: '/passkeys' },
    { label: 'Codes',    icon: <RiLockPasswordLine />, iconBg: 'bg-yellow-500', route: '/codes'    },
    { label: 'Wi-Fi',    icon: <FiWifi />,             iconBg: 'bg-cyan-400',   route: '/wifi'     },
    { label: 'Security', icon: <MdSecurity />,         iconBg: 'bg-red-500',    route: '/security' },
    { label: 'Deleted',  icon: <FiTrash2 />,           iconBg: 'bg-orange-500', route: '/deleted'  },
  ]

  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    const value = e.target.value
    setSearch(value)

    if (value.trim() === '') return

    const match = categories.find(item =>
      item.label.toLowerCase().includes(value.toLowerCase())
    )

    if (match) {
      navigate(match.route)
    }
  }

  return (
    <div className="min-h-screen bg-black px-4 pt-10">

      <h1 className="text-4xl font-bold text-white mb-4">Passwords</h1>

      <SearchBar value={search} onChange={handleSearch} />

      <div className="grid grid-cols-2 gap-3 mt-4">
        {categories.map((item) => (
          <div
            key={item.label}
            onClick={() => navigate(item.route)}
            className="bg-zinc-900 rounded-2xl p-4 cursor-pointer hover:bg-zinc-800 transition-all"
          >
            <div className="flex justify-between items-center mb-8">
              <div className={`${item.iconBg} p-2 rounded-full text-white text-xl`}>
                {item.icon}
              </div>
              <span className="text-gray-400 flex items-center text-sm">
                <FiChevronRight />
              </span>
            </div>
            <p className="text-white font-medium">{item.label}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
export default Home