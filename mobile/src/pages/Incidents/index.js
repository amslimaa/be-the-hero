import React, { useState, useEffect } from 'react';
import { View, FlatList ,Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'
import logoImg from '../../assets/logo.png'

import api from '../../services/api'

import styles from './styles';


export default function Incidents(){
  const navigation = useNavigation();
  const [incidents, setInsidents] = useState([]);
  const [totalCount, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadIncidents(){
    if(loading){
      return;
    }
    if(totalCount > 0 && incidents.length === totalCount) {
      return;
    }
    setLoading(true);

    const response = await api.get('/incidents');
    
    setInsidents([...incidents,...response.data]);
    setTotal(response.headers['x-total-count'])
    setPage(page +1);
    setLoading(false);
  }
  useEffect(() => {
    loadIncidents()
  },[]);

  function navigationToDetail(incident){
    navigation.navigate('Detail', {incident})
  }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logoImg} />
          <Text style={styles.headerText}>
            Total de <Text style={styles.headerTextBold}>{totalCount} casos</Text>
          </Text>
        </View>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>

        <FlatList
          style={styles.incidentList}
          data={incidents}
          keyExtractor={ incident => String(incident.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item : incident }) => (
            <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.description}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR',
              {
                style: 'currency',
                currency: 'BRL'
              } )
              .format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigationToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>
          </View>
          )}
        />


      </View>
    )
}
