export interface User {
  id: string
  email: string
  name?: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  correo: string
  nombre: string
  genero?: string
  edad?: number
  ocupacion?: string
  talla?: string
  tipo_cuerpo?: string
  estado?: string
  tipo_estilo?: number
  created_at: string
  updated_at: string
}

export interface Blog {
  id: number
  titulo: string
  descripcion: string
  contenido: string
  id_categoria: number
  categoria: string
  image: string
  additionalImages?: string[]
  rating: number
  persons: number
  created_at: string
  updated_at: string
}

export interface BlogCategory {
  id: number
  categoria: string
}

export interface Outfit {
  id: number
  nombre: string
  descripcion: string
  id_estilo: number
  estilo: string
  imagen: string
  precio?: number
  ocasiones: string[]
  favoritos: number
  created_at: string
  updated_at: string
  ocasion?: string
  estilos?: {
    id: number
    tipo: string
    descripcion: string
  }
  prendas?: Prenda[]
}

export interface Style {
  id: number
  tipo: string
  descripcion: string
}

export interface Occasion {
  id: number
  ocasion: string
}

export interface Question {
  id: number
  pregunta: string
  answers: Answer[]
}

export interface Answer {
  id: number
  respuesta: string
  identificador: string
  id_estilo: number
  id_pregunta: number
}

export interface Prenda {
  idx?: number
  id: number
  nombre: string
  link: string
  imagen?: string
  id_outfit: number
}

export interface BlogRating {
  id: number
  blog: number
  calificacion: number
  usuario: string
  created_at: string
}

export interface Favorite {
  id: number
  usuario: string
  outfit: number
  created_at: string
}
