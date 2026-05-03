import { useState } from 'react'
import { FiX } from 'react-icons/fi'

const EditForm = ({ entry, onSave, onClose }) => {

    const [site, setSite] = useState(entry.site || '')
    const [password, setPassword] = useState(entry.password || '')
    const [url, setUrl] = useState(entry.url || '')
    const [loading, setLoading] = useState(false)

    const handleSave = async () => {
        if (!site || !password) {
            alert('Site and Password are required!')
            return
        }
        setLoading(true)
        try {
            await onSave({ site, password, url })
            onClose()
        } catch (error) {
            alert('Error saving password: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='fixed inset-0 bg-black/80 flex items-end z-50'>
            <div className='bg-zinc-900 w-full rounded-t-3xl p-6 space-y-4'>

                <div className='flex justify-between items-center'>
                    <h2 className='text-white text-xl font-bold'>Edit Password</h2>
                    <FiX onClick={onClose} className='text-gray-400 text-2xl cursor-pointer' />
                </div>

                <input type='text' placeholder='Site *' value={site}
                    onChange={(e) => setSite(e.target.value)}
                    className='w-full bg-zinc-800 text-white rounded-xl px-4 py-3 outline-none placeholder-gray-500' />

                <input type='password' placeholder='Password *' value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full bg-zinc-800 text-white rounded-xl px-4 py-3 outline-none placeholder-gray-500' />

                <input type='text' placeholder='URL (optional)' value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className='w-full bg-zinc-800 text-white rounded-xl px-4 py-3 outline-none placeholder-gray-500' />

                <button onClick={handleSave} disabled={loading}
                    className='w-full bg-blue-600 text-white font-semibold py-3 rounded-xl cursor-pointer disabled:opacity-50'>
                    {loading ? 'Saving...' : 'Edit'}
                </button>

            </div>
        </div>
    )
}

export default EditForm