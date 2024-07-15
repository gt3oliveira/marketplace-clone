import { Search } from 'lucide-react'
import React from 'react'
import { Input } from './ui/input'
import { SelectCategories } from './SelectCategories'
import { Button } from './ui/button'

interface Props {
  fetchAds: (params: URLSearchParams) => void
}
export function SearchForm({ fetchAds }: Props) {
  function handleSearch(formData: FormData) {
    const params = new URLSearchParams()

    formData.forEach((value, key) => {
      if (typeof value === 'string') {
        params.set(key, value)
      }
    })
    fetchAds(params)
  }

  return (
    <form
      action={handleSearch}
      className="flex flex-col items-center m-4 gap-2"
    >
      <div className="flex w-full px-1 items-center hover:ring-blue-600 hover:ring-1 rounded border border-input">
        <Search className="text-muted-foreground size-5" />
        <Input name="inputSearch" type="text" placeholder="Pesquisar no Marketplace" className="bg-transparent border-0 rounded-none text-gray-900" />
      </div>

      <div className="flex flex-col w-full mt-4 gap-3">
        <span className="font-semibold -mb-3 text-muted-foreground">
          Filtro
        </span>
        <SelectCategories />
        <div className="flex w-full gap-4">
          <Input
            name="minPrice"
            type="number"
            placeholder="Preço min"
            className="bg-transparent text-gray-900 hover:ring-blue-600 hover:ring-1 rounded border border-input"
          />
          <Input
            name="maxPrice"
            type="number"
            placeholder="Preço max"
            className="bg-transparent text-gray-900 hover:ring-blue-600 hover:ring-1 rounded border border-input"
          />
        </div>
        <Button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-500"
        >
          Buscar
        </Button>
      </div>
    </form>
  )
}
