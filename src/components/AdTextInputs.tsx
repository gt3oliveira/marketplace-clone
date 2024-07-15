"use client"
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { categories, createCategories } from '@/libs/helpers'

export type AdTexts = {
  title?: string
  price?: string | number
  category?: string
  description?: string
  contact?: string
}

type Props = {
  defaultValues: AdTexts
}

export function AdTextInputs({ defaultValues }: Props) {
  return (
    <>
      <label htmlFor="titleIn">Título</label>
      <Input
        id='titleIn'
        name='title'
        type="text"
        placeholder="Título do post"
        className="mb-4"
        defaultValue={defaultValues.title}
      />

      <label htmlFor="priceIn">Preço</label>
      <Input
        id='priceIn'
        name='price'
        type="number"
        placeholder="Preço"
        className="mb-4"
        defaultValue={defaultValues.price}
      />

      <label htmlFor="categoryIn">Categoria</label>
      {defaultValues.category ? (
        <Input
          id='categoryIn'
          name='category'
          type="text"
          className="mb-4"
          disabled
          defaultValue={defaultValues.category}
        />
      ) : (
        <Select name='category'>
          <SelectTrigger>
            <SelectValue
              placeholder="Selecione a categoria"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {createCategories.map((c) => (
                <SelectItem
                  key={c.key}
                  value={c.key}
                >
                  <div className="flex flex-row gap-4">
                    <c.icon className="h-4 w-4" />
                    <p>{c.label}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      <label htmlFor="descriptionIn">Descrição</label>
      <Textarea name='description' id='descriptionIn' placeholder="Descrição do post" defaultValue={defaultValues.description} />

      <label htmlFor="mobileIn">Informações de Contato</label>
      <Textarea name='contact' id='mobileIn' placeholder="Contato: +55 11 99999-9999" defaultValue={defaultValues.contact} />
    </>
  )
}
