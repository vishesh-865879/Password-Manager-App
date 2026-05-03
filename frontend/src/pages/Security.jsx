import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiPlus } from 'react-icons/fi'
import SearchBar from '../components/SearchBar'
import PasswordList from '../components/PasswordList'
import PasswordForm from '../components/PasswordForm'
import { getByType, createPassword, updatePassword, deletePassword } from '../api/passwords'

const Security = () => {

    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [passwords, setPasswords] = useState([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        const fetchSecurityPasswords = async () => {
            try {
                const data = await getByType('security')
                setPasswords(data)
            } catch (error) {
                console.error('Error fetching security passwords:', error)
            }
        }
        fetchSecurityPasswords()
    }, [])

    const handleSave = async (entry) => {
        try {
            const newEntry = await createPassword({ ...entry, type: 'security' })
            setPasswords([...passwords, newEntry])
        } catch (error) {
            alert('Error saving password: ' + error.message)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deletePassword(id)
            setPasswords(passwords.filter((p) => p._id !== id))
        } catch (error) {
            alert('Error deleting password: ' + error.message)
        }
    }

    const handleEdit = async (id, updated) => {
        try {
            const updatedEntry = await updatePassword(id, updated)
            setPasswords(passwords.map((p) => p._id === id ? updatedEntry : p))
        } catch (error) {
            alert('Error updating password: ' + error.message)
        }
    }

    return (
        <div className='min-h-screen bg-black'>

            <div className='flex items-center px-4 pt-10 pb-2'>
                <button onClick={() => navigate('/')} className='text-blue-500 flex items-center gap-1'>
                    <FiArrowLeft /> Passwords
                </button>
            </div>

            <h1 className='text-4xl font-bold text-white px-4 mb-2'>Security</h1>

            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

            <PasswordList passwords={passwords} search={search} onDelete={handleDelete} onEdit={handleEdit} />

            <p className='text-center text-gray-600 text-sm mt-4'>{passwords.length} Recommendations</p>

            <button onClick={() => setShowForm(true)} className='fixed bottom-8 right-6 text-blue-500 text-4xl'>
                <FiPlus />
            </button>

            {showForm && <PasswordForm onSave={handleSave} onClose={() => setShowForm(false)} />}

        </div>
    )
}

export default Security