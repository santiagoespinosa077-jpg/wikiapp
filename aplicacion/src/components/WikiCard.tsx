import { View, Text, StyleSheet } from "react-native";
import { NewWikiList } from "../interfaces/wikiResponse";

interface Props {
    wiki: NewWikiList;
}

export const WikiCard = ({ wiki }: Props) => {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>{wiki.label}</Text>
            <Text style={styles.id}>{wiki.id}</Text>
            <Text style={styles.descripcion}>{wiki.description}</Text>
            <Text style={styles.url}>{wiki.url}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card:{
        padding:12,
        marginVertical:6,
        borderRadius:10,
         backgroundColor: '#f2f2f2',
    },
    label:{
        fontSize:18,
        fontWeight:'bold'
    },
    id:{
        color:'gray',
        marginBottom:4,
    },
    descripcion:{
        marginBottom:4,
    },
    url:{
        color:'blue'
    }
})


