import { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { useWikiSearch } from '../hooks/useWikiSearch';
import { WikiCard } from '../components/WikiCard';

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
            <TextInput
              style={ styles.input }
              value={ text }
              onChangeText={ setText }
              onSubmitEditing={ () => setSearch(text) }
              placeholder="Buscar entidad"
              autoCapitalize="none"
              returnKeyType="search"
            />
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
    paddingHorizontal: 10,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
});