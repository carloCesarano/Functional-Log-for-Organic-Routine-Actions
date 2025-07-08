import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as InterventiDAO from '../../../Database/InterventiDAO';
import AnalisiStyles, { coloriInterventi } from '../../../Styles/Analisi';

type TipoIntervento = keyof typeof coloriInterventi;

export default function GraficoInterventiPiante() {
  const [interventi, setInterventi] = useState({
    innaffiature: 0,
    potature: 0,
    rinvasi: 0
  });
  const [loading, setLoading] = useState(true);
  const [maxValue, setMaxValue] = useState(1);

  useEffect(() => {
    const caricaInterventi = async () => {
      try {
        const oggi = new Date();
        const primoGiornoMese = new Date(oggi.getFullYear(), oggi.getMonth(), 1);
        
        const tuttiInterventi = await InterventiDAO.getAll();
        const interventiFiltrati = tuttiInterventi.filter(i => {
          const data = new Date(i.data);
          return data >= primoGiornoMese && data <= oggi;
        });

        const counts = {
          innaffiature: interventiFiltrati.filter(i => i.tipo === 'INN').length,
          potature: interventiFiltrati.filter(i => i.tipo === 'POT').length,
          rinvasi: interventiFiltrati.filter(i => i.tipo === 'RINV').length
        };

        setInterventi(counts);
        setMaxValue(Math.max(...Object.values(counts), 1));
      } catch (error) {
        console.error('Errore nel caricamento:', error);
      } finally {
        setLoading(false);
      }
    };

    caricaInterventi();
  }, []);

  const styles = AnalisiStyles.GRAFICO_INTERVENTI;

  return (
    <View style={AnalisiStyles.PORTRAIT.container}>
      <Text style={AnalisiStyles.PORTRAIT.titolo}>Interventi del mese</Text>
      
      {loading ? (
        <ActivityIndicator size="small" color="#333" />
      ) : (
        <View style={styles.container}>
          {(Object.entries(interventi) as [TipoIntervento, number][]).map(([tipo, valore]) => (
            <View key={tipo} style={styles.riga}>
              <Text style={styles.label}>
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </Text>
              
              <View style={styles.wrapper}>
                <View 
                  style={[
                    styles.barra,
                    { 
                      width: `${Math.min((valore / maxValue) * 100, 80)}%`,
                      backgroundColor: coloriInterventi[tipo]
                    }
                  ]}
                />
                <Text style={[styles.valore, {color: coloriInterventi[tipo]}]}>
                  {valore}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
