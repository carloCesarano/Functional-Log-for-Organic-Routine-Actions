import { StyleSheet } from 'react-native';

/**
 * STILI per il componente UltimePianteAggiunte
 * 
 * CONTIENE:
 * - Tutti gli stili necessari per la visualizzazione delle card delle piante
 * - Supporto per orientamento portrait e landscape
 * - Stili per stati speciali (caricamento, errore, lista vuota)
 */
export const styles = StyleSheet.create({
    // Contenitore principale (Portrait)
    containerP: {
        marginVertical: 20,
        paddingHorizontal: 15,
    },
    
    // Contenitore principale (Landscape)
    containerL: {
        marginVertical: 15,
        paddingHorizontal: 10,
    },
    
    // Titolo della sezione
    titolo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    
    // Lista delle piante (layout a griglia)
    listaPiante: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    
    // Card singola pianta
    card: {
        width: '48%', // 2 colonne con spazio tra loro
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        // Ombre
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    
    // Stile immagine pianta
    immagine: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: '#f5f5f5', // Sfondo per fallback
    },
    
    // Nome pianta
    nomePianta: {
        fontSize: 16,
        fontWeight: '600',
        color: '#52B04E',
        textAlign: 'center',
    },
    
    // Stato di caricamento
    caricamento: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    
    // Messaggio di errore
    error: {
        color: 'red',
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 16,
    },
    
    // Messaggio lista vuota
    testoVuoto: {
        color: '#666',
        textAlign: 'center',
        marginVertical: 20,
        fontStyle: 'italic',
        fontSize: 16,
    },
});