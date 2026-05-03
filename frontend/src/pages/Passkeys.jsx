import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiPlus } from 'react-icons/fi'
import SearchBar from '../components/SearchBar'
import PasswordList from '../components/PasswordList'
import PasswordForm from '../components/PasswordForm'
import { getByType, createPassword, updatePassword, deletePassword } from '../api/passwords'

const Passkeys = () => {

    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [passkeys, setPasskeys] = useState([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        const fetchPasskeys = async () => {
            try {
                const data = await getByType('passkey')
                setPasskeys(data)
            } catch (error) {
                console.error('Error fetching passkeys:', error)
            }
        }
        fetchPasskeys()
    }, [])

    const handleSave = async (entry) => {
        try {
            const newEntry = await createPassword({ ...entry, type: 'passkey' })
            setPasskeys([...passkeys, newEntry])
        } catch (error) {
            alert('Error saving passkey: ' + error.message)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deletePassword(id)
            setPasskeys(passkeys.filter((p) => p._id !== id))
        } catch (error) {
            alert('Error deleting passkey: ' + error.message)
        }
    }

    const handleEdit = async (id, updated) => {
        try {
            const updatedEntry = await updatePassword(id, updated)
            setPasskeys(passkeys.map((p) => p._id === id ? updatedEntry : p))
        } catch (error) {
            alert('Error updating passkey: ' + error.message)
        }
    }

    return (
        <div className='min-h-screen bg-black'>

            <div className='flex items-center px-4 pt-10 pb-2'>
                <button onClick={() => navigate('/')} className='text-blue-500 flex items-center gap-1'>
                    <FiArrowLeft /> Passwords
                </button>
            </div>

            <h1 className='text-4xl font-bold text-white px-4 mb-2'>Passkeys</h1>

            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

            <PasswordList passwords={passkeys} search={search} onDelete={handleDelete} onEdit={handleEdit} />

            <p className='text-center text-gray-600 text-sm mt-4'>{passkeys.length} Passkeys</p>

            <button onClick={() => setShowForm(true)} className='fixed bottom-8 right-6 text-blue-500 text-4xl'>
                <FiPlus />
            </button>

            {showForm && <PasswordForm onSave={handleSave} onClose={() => setShowForm(false)} />}

        </div>
    )
}

export default Passkeys