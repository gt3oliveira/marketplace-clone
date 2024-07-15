"use client";

import { AdItem } from "@/components/AdItem";
import { SearchForm } from "@/components/SearchForm";
import { Ad } from "@/models/Ad";
import { useEffect, useState } from "react";

export default function Home() {
  const [ads, setAds] = useState<Ad[] | null>(null)
  const [adsParams, setAdsParams] = useState<URLSearchParams>(new URLSearchParams())

  useEffect(() => {
    fetchAds(new URLSearchParams())
  }, [])

  function fetchAds(params: URLSearchParams) {
    let url = ''

    if (params.toString().includes('=all')) {
      url = `/api/ads?${params.toString().replace('category=all', 'category=')}`
    } else {
      url = `/api/ads?${params.toString()}`
    }

    fetch(url).then(res => {
      res.json().then(adsDocs => {
        setAds(adsDocs)
        setAdsParams(params)
      })
    })
  }

  const formDirty = adsParams.get('inputSearch')
    || adsParams.get('category')
    || adsParams.get('minPrice')
    || adsParams.get('maxPrice')

  return (
    <div className="flex w-full">
      <div className="grow w-1/4">
        <SearchForm fetchAds={fetchAds} />
      </div>
      <div className="p-4 grow w-3/4 bg-gray-100 border-l h-[calc(100vh-64px)] overflow-y-scroll">
        <h2 className="font-bold my-4">
          {(formDirty && !formDirty?.includes('all')) ? 'Resultados da busca' : 'Últimos anúncios'}
        </h2>
        <div className="grid md:grid-cols-4 gap-x-4 gap-y-6">
          {ads && ads.map(ad => (
            <AdItem key={ad._id} ad={ad} />
          ))}
        </div>
        {(ads && ads.length === 0) && (
          <div className="text-gray-400">
            Nenhum anúncio encontrado.
          </div>
        )}
        {ads === null && (
          <div className="text-gray-400 flex gap-2 items-center">
            <div className="loader" />
            <span>Carregando...</span>
          </div>
        )}
      </div>
    </div>
  );
}
