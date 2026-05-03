import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiPlus } from 'react-icons/fi'
import SearchBar from '../components/SearchBar'
import PasswordList from '../components/PasswordList'
import PasswordForm from '../components/PasswordForm'
import { getByType, createPassword, updatePassword, deletePassword } from '../api/passwords'

const WiFi = () => {

    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [networks, setNetworks] = useState([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        const fetchNetworks = async () => {
            try {
                const data = await getByType('wifi')
                setNetworks(data)
            } catch (error) {
                console.error('Error fetching networks:', error)
            }
        }
        fetchNetworks()
    }, [])

    const handleSave = async (entry) => {
        try {
            const newEntry = await createPassword({ ...entry, type: 'wifi' })
            setNetworks([...networks, newEntry])
        } catch (error) {
            alert('Error saving network: ' + error.message)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deletePassword(id)
            setNetworks(networks.filter((p) => p._id !== id))
        } catch (error) {
            alert('Error deleting network: ' + error.message)
        }
    }

    const handleEdit = async (id, updated) => {
        try {
            const updatedEntry = await updatePassword(id, updated)
            setNetworks(networks.map((p) => p._id === id ? updatedEntry : p))
        } catch (error) {
            alert('Error updating network: ' + error.message)
        }
    }

    return (
        <div className='min-h-screen bg-black'>

            <div className='flex items-center px-4 pt-10 pb-2'>
                <button onClick={() => navigate('/')} className='text-blue-500 flex items-center gap-1'>
                    <FiArrowLeft /> Passwords
                </button>
            </div>

            <h1 className='text-4xl font-bold text-white px-4 mb-2'>Wi-Fi</h1>

            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

            <PasswordList passwords={networks} search={search} onDelete={handleDelete} onEdit={handleEdit} />

            <p className='text-center text-gray-600 text-sm mt-4'>{networks.length} Networks</p>

            <button onClick={() => setShowForm(true)} className='fixed bottom-8 right-6 text-blue-500 text-4xl'>
                <FiPlus />
            </button>

            {showForm && <PasswordForm onSave={handleSave} onClose={() => setShowForm(false)} />}

        </div>
    )
}

export default WiFi