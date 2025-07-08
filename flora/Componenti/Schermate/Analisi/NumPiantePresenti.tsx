
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as PiantePosseduteDAO from '../../../Database/PiantePosseduteDAO';
import AnalisiStyles from '../../../Styles/Analisi';

export default function NumPiantePresenti() {
  const [numeroPiante, setNumeroPiante] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const caricaNumeroPiante = async () => {
      try {
        const piante = await PiantePosseduteDAO.getAll();
        setNumeroPiante(piante.length);
      } catch (err) {
        console.error('Errore nel caricamento:', err);
        setNumeroPiante(0);
      } finally {
        setLoading(false);
      }
    };
    caricaNumeroPiante();
  }, []);

  return (
    <View style={AnalisiStyles.PORTRAIT.container}>
      <Text style={AnalisiStyles.PORTRAIT.titolo}>Numero totale di piante</Text>
      {loading ? (
        <ActivityIndicator size="small" color="#333" />
      ) : (
        <Text style={[AnalisiStyles.PORTRAIT.valore, AnalisiStyles.PORTRAIT.numeroPiante]}>
          {numeroPiante}
        </Text>
      )}
    </View>
  );
}