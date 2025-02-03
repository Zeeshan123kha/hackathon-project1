import { type SchemaTypeDefinition } from 'sanity'
import { categorySchema } from './categories'
import { productSchema } from './product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productSchema, categorySchema],
}

