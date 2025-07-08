import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import * as PiantePosseduteDAO from '../../../Database/PiantePosseduteDAO';
import { PiantaPosseduta } from '../../../Model/PiantaPosseduta';

import stili from '../../../Styles/Analisi';
const styles = stili.PORTRAIT;

export default function StatoGeneraleCollezione() {
  const [loading, setLoading] = useState(true);
  const [statoCollezione, setStatoCollezione] = useState<number>(0);
  const [piantaPiuSalute, setPiantaPiuSalute] = useState<PiantaPosseduta | null>(null);
  const [piantaMenoSalute, setPiantaMenoSalute] = useState<PiantaPosseduta | null>(null);

  useEffect(() => {
    const caricaDati = async () => {
      try {
        const piante = await PiantePosseduteDAO.getAll();
        
        if (piante.length === 0) {
          setStatoCollezione(0);
          return;
        }

        // Calcola la media dello stato della collezione
        const mediaStato = piante.reduce((sum, pianta) => sum + pianta.stato(), 0) / piante.length;
        setStatoCollezione(mediaStato);

        // Trova pianta con stato migliore e peggiore
        const pianteOrdinate = [...piante].sort((a, b) => b.stato() - a.stato());
        setPiantaPiuSalute(pianteOrdinate[0]);
        setPiantaMenoSalute(pianteOrdinate[pianteOrdinate.length - 1]);

      } catch (err) {
        console.error('Errore nel caricamento:', err);
      } finally {
        setLoading(false);
      }
    };

    caricaDati();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titolo}>Stato generale delle tue piante</Text>
      
      {loading ? (
        <ActivityIndicator size="small" color="#333" />
      ) : (
        <>
          <Text style={[styles.percentuale, {color: piantaPiuSalute?.coloreStato() || '#4CAF50'}]}>
            {Math.round(statoCollezione * 100)}%
          </Text>
          
          <View style={styles.containerPiante}>
            {/* Card Pianta più in salute */}
            {piantaPiuSalute && (
              <View style={[
                styles.cardPianta, 
                { backgroundColor: piantaPiuSalute.coloreStato() }
              ]}>
                <Text style={styles.cardLabel}>Pianta più in salute</Text>
                {typeof piantaPiuSalute.getFoto() === 'number' ? (
                  <Image 
                    source={piantaPiuSalute.getFoto() as number} 
                    style={styles.immaginePianta}
                  />
                ) : (
                  <Image 
                    source={{ uri: (piantaPiuSalute.getFoto() as {uri: string}).uri }} 
                    style={styles.immaginePianta}
                  />
                )}
                <Text style={styles.nomePianta}>{piantaPiuSalute.getNome()}</Text>
                <Text style={styles.statoPianta}>
                  {Math.round(piantaPiuSalute.stato() * 100)}%
                </Text>
              </View>
            )}

            {/* Card Pianta più malata */}
            {piantaMenoSalute && (
              <View style={[
                styles.cardPianta, 
                { backgroundColor: piantaMenoSalute.coloreStato() }
              ]}>
                <Text style={styles.cardLabel}>Pianta più malata</Text>
                {typeof piantaMenoSalute.getFoto() === 'number' ? (
                  <Image 
                    source={piantaMenoSalute.getFoto() as number} 
                    style={styles.immaginePianta}
                  />
                ) : (
                  <Image 
                    source={{ uri: (piantaMenoSalute.getFoto() as {uri: string}).uri }} 
                    style={styles.immaginePianta}
                  />
                )}
                <Text style={styles.nomePianta}>{piantaMenoSalute.getNome()}</Text>
                <Text style={styles.statoPianta}>
                  {Math.round(piantaMenoSalute.stato() * 100)}%
                </Text>
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
}