import { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useWikiSearch } from '../hooks/useWikiSearch';
import { WikiCard } from '../components/WikiCard';
import { colors } from '../theme/appTheme';
import { Ionicons } from "@expo/vector-icons";

export const WikiHome = () => {

  const [text, setText] = useState<string>('programacion');
  const [search, setSearch] = useState<string>('programacion');

  const { isLoading, simpleWikiList } = useWikiSearch(search);

  return (
    <View style={ styles.container }>
      <FlatList
        data={ simpleWikiList }
        keyExtractor={ (wiki, index) => `${wiki.id}${index}` }
        ListHeaderComponent={(
          <View style={ styles.header }>
            <Text style={ styles.title }>Wiki</Text>
            <View>
            <TextInput
              style={ styles.input }
              value={ text }
              onChangeText={ setText }
              onSubmitEditing={ () => setSearch(text) }
              placeholder="Buscar en Wiki"
              placeholderTextColor={ colors.textid }
              selectionColor={ colors.primary }
              autoCapitalize="none"
              returnKeyType="search"
            />
            <Ionicons
                name="search-outline"
                size={ 22 }
                color={ colors.primary }
                style={ styles.searchIcon }
                onPress={ () => setSearch(text) }
              />
          </View>
          </View>
        )}
        renderItem={ ({ item }) => <WikiCard wiki={ item } /> }
        showsVerticalScrollIndicator={ false }
        keyboardShouldPersistTaps="handled"
        ListFooterComponent={(
          isLoading
            ? <ActivityIndicator style={{ height: 120 }} size={ 50 } color="blue" />
            : null
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 14,
    backgroundColor: colors.background
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    marginBottom: 12,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    color: colors.text,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    fontSize: 17,
    backgroundColor: colors.card,
  },
  searchIcon: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    textAlignVertical: 'center',
    lineHeight: 42, 
  },
});