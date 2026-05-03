import { useState } from 'react'
import { FiChevronRight, FiGlobe } from 'react-icons/fi'
import EditForm from './EditForm'

const PasswordList = ({ passwords, search, onDelete, onEdit }) => {

    const [openMenu, setOpenMenu] = useState(null)
    const [editingId, setEditingId] = useState(null)

    const filtered = passwords.filter(item =>
        item.site.toLowerCase().includes(search.toLowerCase())
    )

    if (filtered.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center mt-32 text-gray-600'>
                <FiGlobe className='text-5xl mb-4' />
                <p className='text-lg font-semibold text-gray-500'>No entries found</p>
            </div>
        )
    }

    return (
        <div className='mt-2'>
            {filtered.map((item) => (
                <div key={item._id} className='border-b border-zinc-800'>

                    <div className='flex items-center px-4 py-4'>

                        <div className='bg-zinc-700 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold mr-4 flex-shrink-0'>
                            {item.site.charAt(0).toUpperCase()}
                        </div>

                        <div className='flex-1'>
                            <p className='text-white font-medium'>{item.site}</p>
                            <p className='text-gray-500 text-sm'>{item.url || 'No URL'}</p>
                        </div>

                        <FiChevronRight
                            onClick={() => setOpenMenu(openMenu === item._id ? null : item._id)}
                            className='text-gray-600 cursor-pointer text-xl' />

                    </div>

                    {openMenu === item._id && (
                        <div className='flex gap-3 px-4 pb-4'>
                            <button
                                onClick={() => { onDelete(item._id); setOpenMenu(null) }}
                                className='flex-1 bg-red-600 text-white py-2 rounded-xl text-sm font-semibold cursor-pointer'>
                                Delete
                            </button>
                            <button
                                onClick={() => { setEditingId(item._id); setOpenMenu(null) }}
                                className='flex-1 bg-zinc-700 text-white py-2 rounded-xl text-sm font-semibold cursor-pointer'>
                                Edit
                            </button>
                        </div>
                    )}

                </div>
            ))}

            {editingId !== null && (
                <EditForm
                    entry={passwords.find(p => p._id === editingId)}
                    onSave={(updated) => { onEdit(editingId, updated); setEditingId(null) }}
                    onClose={() => setEditingId(null)}
                />
            )}

        </div>
    )
}

export default PasswordList