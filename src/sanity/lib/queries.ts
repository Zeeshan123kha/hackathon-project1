import { groq } from "next-sanity";


export const allProducts = groq `*[_type == "products"][1..8]`

export const four = groq `*[_type == "products"] [0..3]`

export const category = groq `*[_type == "categories"]`

