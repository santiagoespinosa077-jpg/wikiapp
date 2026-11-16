import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NewWikiList } from "../interfaces/wikiResponse";
import { WikiParams } from "../navigator/WikiNavigation";
import { useState } from "react";
import { colors } from "../theme/appTheme";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    wiki: NewWikiList;
}

export const WikiCard = ({ wiki }: Props) => {
    const navigation = useNavigation<StackNavigationProp<WikiParams>>();
    const [imageFailed, setImageFailed] = useState(false);

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("WikiDetail", { NewWikiList: wiki })}
        >
            <View style={styles.card}>
                {wiki.image && !imageFailed && (
                    <Image
                        source={{ uri: wiki.image }}
                        style={styles.image}
                        onError={() => setImageFailed(true)}
                    />
                )}

                <Text style={styles.label}>{wiki.label}</Text>
                <Text style={styles.id}>{wiki.id}</Text>
                <Text style={styles.descripcion}>{wiki.description}</Text>
                <Text style={styles.url}>{wiki.url}</Text>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    card: {
        padding: 12,
        marginVertical: 6,
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    image: {
        width: "100%",
        height: 160,
        borderRadius: 8,
        marginBottom: 8,
    },
    id: {
        color: 'gray',
        marginBottom: 4,
    },
    descripcion: {
        marginBottom: 4,
    },
    url: {
        color: 'blue'
    }
})


