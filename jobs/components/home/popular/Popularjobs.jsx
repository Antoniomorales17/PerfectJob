import { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from "expo-router"

import styles from './popularjobs.style'
import { COLORS, SIZES } from "../../../constants"
import PopularCardJobs from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";

const Popularjobs = () => {
  const router = useRouter()
   const {data, isLoading, error} = useFetch
   ("search",{
    query: " React developer",
    num_pages:1

   })

   console.log(data)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Trabajos Populares</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Mostrar todo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Algo mal ha pasado</Text>
        ) : (
          <FlatList
  data={data} // Utiliza el array de objetos que obtuviste de la API
  renderItem={({ item }) => (
    <PopularCardJobs
      item={item}
    />
  )}
  keyExtractor={(item) => item.job_id.toString()} // Usa una propiedad única como clave
  contentContainerStyle={{ columnGap: SIZES.medium }}
  horizontal
/>

        )}
      </View>
    </View>
  );

}

export default Popularjobs