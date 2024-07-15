import { ArrowDownWideNarrow, Car, Computer, Lamp, Shirt, Tv2 } from "lucide-react";
import mongoose from "mongoose";

export async function connect() {
  return mongoose.connect(process.env.MONGODB_URL as string)
}

export const categories = [
  { key: 'all', label: 'Todas as categorias', icon: ArrowDownWideNarrow },
  { key: 'informatica', label: 'Informática', icon: Computer },
  { key: 'domesticos', label: 'Domésticos', icon: Lamp },
  { key: 'eletronicos', label: 'Eletrônicos', icon: Tv2 },
  { key: 'roupas', label: 'Roupas', icon: Shirt },
  { key: 'carros', label: 'Carros', icon: Car },
]

export const createCategories = [
  { key: 'informatica', label: 'Informática', icon: Computer },
  { key: 'domesticos', label: 'Domésticos', icon: Lamp },
  { key: 'eletronicos', label: 'Eletrônicos', icon: Tv2 },
  { key: 'roupas', label: 'Roupas', icon: Shirt },
  { key: 'carros', label: 'Carros', icon: Car },
]

export function formatNumber(price: number): string {
  return 'R$ ' + price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
}

export function formatDate(date: Date): string {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const formato = new Intl.DateTimeFormat('pt-BR', options as Intl.DateTimeFormatOptions)
  return formato.format(date)
}
