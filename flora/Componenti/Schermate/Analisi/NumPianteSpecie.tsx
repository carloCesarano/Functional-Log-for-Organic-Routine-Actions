import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as PiantePosseduteDAO from '../../../Database/PiantePosseduteDAO';
import AnalisiStyles from '../../../Styles/Analisi';

export default function NumPiantePerSpecie() {
  const [specie, setSpecie] = useState<{nome: string, conteggio: number}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const caricaDati = async () => {
      try {
        const piante = await PiantePosseduteDAO.getAll();
        
        // Conta le piante per specie
        const conteggioSpecie: Record<string, number> = {};
        piante.forEach(pianta => {
          const nomeSpecie = pianta.getSpecie().getSpecie();
          conteggioSpecie[nomeSpecie] = (conteggioSpecie[nomeSpecie] || 0) + 1;
        });

        // Converti in array di oggetti
        const dati = Object.entries(conteggioSpecie).map(([nome, conteggio]) => ({
          nome,
          conteggio
        })).filter(s => s.conteggio > 0);

        setSpecie(dati);
      } catch (err) {
        console.error('Errore nel caricamento:', err);
        setSpecie([]);
      } finally {
        setLoading(false);
      }
    };
    caricaDati();
  }, []);

  return (
    <View style={AnalisiStyles.PORTRAIT.container}>
      <Text style={AnalisiStyles.PORTRAIT.titolo}>Distribuzione per specie</Text>
      
      {loading ? (
        <ActivityIndicator size="small" color="#333" />
      ) : specie.length === 0 ? (
        <Text style={{color: '#777', textAlign: 'center', marginTop: 10}}>
          Nessuna pianta registrata
        </Text>
      ) : (
        <View style={AnalisiStyles.PORTRAIT.listaContainer}>
          {specie.map((specie, index) => (
            <View key={index} style={AnalisiStyles.PORTRAIT.listaItem}>
              <Text style={AnalisiStyles.PORTRAIT.listaLabel}>{specie.nome}</Text>
              <Text style={AnalisiStyles.PORTRAIT.listaValore}>{specie.conteggio}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}