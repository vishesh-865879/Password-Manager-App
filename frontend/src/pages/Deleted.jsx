import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiTrash2, FiRotateCcw } from 'react-icons/fi'
import { getDeletedPasswords, restorePassword, permanentlyDeletePassword } from '../api/passwords'

const Deleted = () => {

    const navigate = useNavigate()
    const [deletedPasswords, setDeletedPasswords] = useState([])
    const [openMenu, setOpenMenu] = useState(null)

    useEffect(() => {
        const fetchDeletedPasswords = async () => {
            try {
                const data = await getDeletedPasswords()
                setDeletedPasswords(data)
            } catch (error) {
                console.error('Error fetching deleted passwords:', error)
            }
        }
        fetchDeletedPasswords()
    }, [])

    const handleRestore = async (id) => {
        try {
            await restorePassword(id)
            setDeletedPasswords(deletedPasswords.filter(p => p._id !== id))
            setOpenMenu(null)
        } catch (error) {
            alert('Error restoring password: ' + error.message)
        }
    }

    const handlePermanentDelete = async (id) => {
        if (window.confirm('Permanently delete this password?')) {
            try {
                await permanentlyDeletePassword(id)
                setDeletedPasswords(deletedPasswords.filter(p => p._id !== id))
                setOpenMenu(null)
            } catch (error) {
                alert('Error deleting password: ' + error.message)
            }
        }
    }

    return (
        <div className='min-h-screen bg-black'>

            <div className='flex items-center px-4 pt-10 pb-2'>
                <button onClick={() => navigate('/')} className='text-blue-500 flex items-center gap-1'>
                    <FiArrowLeft /> Passwords
                </button>
            </div>

            <h1 className='text-4xl font-bold text-white px-4 mb-2'>Recently Deleted</h1>

            {deletedPasswords.length === 0 ? (
                <div className='flex flex-col items-center justify-center mt-52 px-8 text-center'>
                    <FiTrash2 className='text-gray-600 text-8xl mb-6' />
                    <p className='text-white text-xl font-bold mb-2'>No Deleted Passwords</p>
                    <p className='text-gray-500 text-sm'>Deleted passwords and passkeys are available here for 30 days before they are automatically removed.</p>
                </div>
            ) : (
                <div className='mt-2'>
                    {deletedPasswords.map((item) => (
                        <div key={item._id} className='border-b border-zinc-800'>

                            <div className='flex items-center px-4 py-4'>

                                <div className='bg-zinc-700 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold mr-4 flex-shrink-0'>
                                    {item.site.charAt(0).toUpperCase()}
                                </div>

                                <div className='flex-1'>
                                    <p className='text-white font-medium'>{item.site}</p>
                                    <p className='text-gray-500 text-sm'>{item.url || 'No URL'}</p>
                                </div>

                                <button
                                    onClick={() => setOpenMenu(openMenu === item._id ? null : item._id)}
                                    className='text-gray-600 cursor-pointer text-xl'>
                                    ⋮
                                </button>

                            </div>

                            {openMenu === item._id && (
                                <div className='flex gap-3 px-4 pb-4'>
                                    <button
                                        onClick={() => handleRestore(item._id)}
                                        className='flex-1 bg-blue-600 text-white py-2 rounded-xl text-sm font-semibold cursor-pointer flex items-center justify-center gap-2'>
                                        <FiRotateCcw /> Restore
                                    </button>
                                    <button
                                        onClick={() => handlePermanentDelete(item._id)}
                                        className='flex-1 bg-red-600 text-white py-2 rounded-xl text-sm font-semibold cursor-pointer'>
                                        Delete
                                    </button>
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default Deleted