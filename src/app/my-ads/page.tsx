import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { connect } from '@/libs/helpers'
import { AdModel } from '@/models/Ad'
import { AdItem } from '@/components/AdItem'

export default async function MyAdsPage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email
  if (!email) { return 'Email não encontrado.' }
  await connect()

  const adsDocs = await AdModel.find({ userEmail: email })

  return (
    <div className='container my-8 px-24'>
      <h1 className='text-2xl font-bold mb-4'>Meus anúncios</h1>
      <div className='grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-4 z-0'>
        {adsDocs.map(ad => (
          <AdItem key={ad._id} ad={ad} />
        ))}
      </div>
    </div>
  )
}
