'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { AdForm } from "@/components/AdForm"
import { connect } from "@/libs/helpers"
import { AdModel } from "@/models/Ad"
import { getServerSession } from "next-auth"

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string }
}

export default async function EditPage(props: Props) {
  const id = props.params.id
  await connect()
  const session = await getServerSession(authOptions)
  const adDoc = await AdModel.findById(id)

  if (!adDoc) {
    return '404: Anúncio não encontrado.'
  }
  if (session?.user?.email !== adDoc?.userEmail) {
    return 'Este anúncio não te pertence.'
  }

  return (
    <AdForm
      id={adDoc._id}
      defaultTexts={adDoc}
      defaultFiles={adDoc.files}
    />
  )
}
