import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const coloriInterventi = {
  innaffiature: '#4CAF50',
  potature: '#FF9800',
  rinvasi: '#F44336',
};

const baseStyles = StyleSheet.create({
  container: {
    backgroundColor: '#bbe89f',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,          
    borderColor: '#384637',
  },
  titolo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  valore: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  numeroPiante: {
    color: '#4caf50',
  },
  listaContainer: {
    marginTop: 15,
  },
  listaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listaLabel: {
    fontSize: 16,
    color: '#555',
  },
  listaValore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  // Nuovi stili per StatoGeneraleCollezione
  percentuale: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  containerPiante: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardPianta: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  immaginePianta: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  nomePianta: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  statoPianta: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});

const graficoInterventi = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  riga: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    width: 100,
    fontSize: 14,
    color: '#555',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  barra: {
    height: 20,
    borderRadius: 10,
    marginRight: 8,
  },
  valore: {
    fontSize: 14,
    fontWeight: 'bold',
    position: 'absolute',
    right: 0,
    paddingHorizontal: 4,
    borderRadius: 10,
  },
});

export default {
  PORTRAIT: baseStyles,
  LANDSCAPE: {
    ...baseStyles,
    container: {
      ...baseStyles.container,
      marginHorizontal: 30,
      padding: 25,
    },
  },
  GRAFICO_INTERVENTI: graficoInterventi,
};