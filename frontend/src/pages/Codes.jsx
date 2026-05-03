import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiPlus } from 'react-icons/fi'
import { MdLockClock } from 'react-icons/md'
import SearchBar from '../components/SearchBar'
import PasswordList from '../components/PasswordList'
import PasswordForm from '../components/PasswordForm'
import { getByType, createPassword, updatePassword, deletePassword } from '../api/passwords'

const Codes = () => {

    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [codes, setCodes] = useState([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        const fetchCodes = async () => {
            try {
                const data = await getByType('code')
                setCodes(data)
            } catch (error) {
                console.error('Error fetching codes:', error)
            }
        }
        fetchCodes()
    }, [])

    const handleSave = async (entry) => {
        try {
            const newEntry = await createPassword({ ...entry, type: 'code' })
            setCodes([...codes, newEntry])
        } catch (error) {
            alert('Error saving code: ' + error.message)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deletePassword(id)
            setCodes(codes.filter((p) => p._id !== id))
        } catch (error) {
            alert('Error deleting code: ' + error.message)
        }
    }

    const handleEdit = async (id, updated) => {
        try {
            const updatedEntry = await updatePassword(id, updated)
            setCodes(codes.map((p) => p._id === id ? updatedEntry : p))
        } catch (error) {
            alert('Error updating code: ' + error.message)
        }
    }

    return (
        <div className='min-h-screen bg-black'>

            <div className='flex items-center px-4 pt-10 pb-2'>
                <button onClick={() => navigate('/')} className='text-blue-500 flex items-center gap-1'>
                    <FiArrowLeft /> Passwords
                </button>
            </div>

            <h1 className='text-4xl font-bold text-white px-4 mb-2'>Codes</h1>

            {codes.length === 0 ? (
                <div className='flex flex-col items-center justify-center mt-40 px-8 text-center'>
                    <MdLockClock className='text-gray-600 text-8xl mb-6' />
                    <p className='text-white text-xl font-bold mb-2'>No Saved Verification Codes</p>
                    <p className='text-gray-500 text-sm mb-4'>Verification codes provide an extra layer of security to help keep your accounts safe.</p>
                    <button className='text-blue-500 text-sm'>More About Verification Codes</button>
                </div>
            ) : (
                <>
                    <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
                    <PasswordList passwords={codes} search={search} onDelete={handleDelete} onEdit={handleEdit} />
                    <p className='text-center text-gray-600 text-sm mt-4'>{codes.length} Items</p>
                </>
            )}

            <button onClick={() => setShowForm(true)} className='fixed bottom-8 right-6 text-blue-500 text-4xl'>
                <FiPlus />
            </button>

            {showForm && <PasswordForm onSave={handleSave} onClose={() => setShowForm(false)} />}

        </div>
    )
}

export default Codes