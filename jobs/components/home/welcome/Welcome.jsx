import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';

import { router, useRouter } from 'expo-router';
import { icons, SIZES } from '../../../constants';

const jobTypes = ["Full-time", "Part-time", "Contratista"];

import styles from './welcome.style';

const Welcome = () => {
  const Router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time")

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hola Antonio</Text>
        <Text style={styles.welcomeMessage}>Encuentra tu trabajo perfecto</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onChange={() => {}}
            placeholder="¿Qué estás buscando?"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onLongPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.tab(activeJobType, item)}
            onPress={() =>{
              setActiveJobType(item);
              router.push("./search/${item}")
            }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle= {{columnGap: SIZES.small}}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
