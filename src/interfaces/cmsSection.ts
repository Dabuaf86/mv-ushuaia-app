export interface CmsSection {
    id?: string;               // UUID
    value: string;            // Clave lógica como "map" o "itineraries"
    content: {
        en: {
            title: string;     // Título en inglés
            html_en: string;       // Contenido en inglés
            label: string;     // Etiqueta en inglés
        },
        es: {
            title: string;     // Título en español
            html_es: string;       // Contenido en español
            label: string;     // Etiqueta en español
        }
    };
}

export interface CmsSectionResponse {
    sections: CmsSection[]; // Array de secciones
    updatedAt: string;      // Fecha de la última actualización
}