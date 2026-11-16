import { View, Text, StyleSheet, Image } from "react-native";
import { NewWikiList } from "../interfaces/wikiResponse";

interface Props {
    wiki: NewWikiList;
}

export const WikiCard = ({ wiki }: Props) => {
    return (
        <View style={styles.card}>
            {wiki.image && (
                <Image
                    source={{uri: wiki.image}}
                    style={styles.image}     
                />
            )}
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
    image: {
        width: "100%",
        height: 160,
        borderRadius: 8,
        marginBottom: 8,
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


