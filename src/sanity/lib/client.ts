import { createClient } from 'next-sanity'

import { fromDocuments } from 'sanity/migrate'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId : "7knkjhgp",
  dataset : "production",
  apiVersion : "2023-01-01",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

