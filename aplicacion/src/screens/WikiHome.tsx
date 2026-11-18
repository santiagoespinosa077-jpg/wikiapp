import { useState,useMemo } from 'react';
import { View, Text, TextInput, ActivityIndicator, FlatList, StyleSheet,Pressable} from 'react-native';
import { useWikiSearch } from '../hooks/useWikiSearch';
import { WikiCard } from '../components/WikiCard';
import { Colors } from '../theme/appTheme';
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from '../theme/ThemeContext';


export const WikiHome = () => {

  const { colors, isDark, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

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
            <Pressable onPress={ toggleTheme } style={ styles.themeButton }>
              <Ionicons
                name={ isDark ? 'sunny-outline' : 'moon-outline' }
                size={ 22 }
                color={ colors.text }
              />
            </Pressable>
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
            ? <ActivityIndicator style={{ height: 120 }} size={ 50 } color={ colors.primary } />
            : undefined
        )}
      />
    </View>
  );
}

const createStyles = (colors: Colors) => StyleSheet.create({
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
    themeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.chip,
    alignItems: 'center',
    justifyContent: 'center',
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