import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { categories } from '@/libs/helpers'

export function SelectCategories() {
  return (
    <>
      <Select name='category'>
        <SelectTrigger className="hover:ring-blue-600 hover:ring-1 rounded">
          <SelectValue placeholder="Selecione a categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map((c) => (
              <SelectItem
                key={c.key}
                value={c.key}
              >
                <div className="flex flex-row gap-4 items-center">
                  <c.icon className="h-4 w-4" />
                  <p>{c.label}</p>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
