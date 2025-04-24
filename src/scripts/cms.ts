import { db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore'
import { CmsSection } from '@/interfaces/cmsSection'

export const getCmsSection = async (value: string): Promise<CmsSection> => {
    const sectionQuery = query(collection(db, 'cmsSections'), where('value', '==', value))
    const snap = await getDocs(sectionQuery)
    if (snap.empty) {
        throw new Error(`No se encontró la sección: ${value}`)
    }
    return {
        id: snap.docs[0].id,
        ...snap.docs[0].data()
    } as CmsSection
}

export const getAllCmsSections = async (): Promise<CmsSection[]> => {
    const snapshot = await getDocs(collection(db, 'cmsSections'))
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as CmsSection))
}