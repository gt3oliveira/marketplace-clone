import Link from "next/link"
import { UploadThumbnail } from "./UploadThumbnail"
import { Ad } from "@/models/Ad"
import { formatNumber } from "@/libs/helpers"

interface AdItemProps {
  ad: Ad
}

export function AdItem({ ad }: AdItemProps) {
  return (
    <div key={ad.title} className="min-h-24 flex flex-col w-full justify-start">
      {ad.files.length > 0 && (
        <div className="rounded-md overflow-hidden relative">
          <div className="absolute inset-0 z-10 bg-black/0 hover:bg-black/10 transition duration-300 cursor-pointer">
            <Link href={`/ad/${ad._id}`} className="absolute inset-0" />
          </div>
          <UploadThumbnail
            file={ad.files[0]}
            width={1000}
            height={1000}
          />
        </div>
      )}
      <div>
        <p className="mt-1 font-bold text-sm">
          {formatNumber(ad.price)}
        </p>
        <Link href={`/ad/${ad._id}`} className="text-sm">
          {ad.title}
        </Link>
      </div>
    </div>
  )
}
