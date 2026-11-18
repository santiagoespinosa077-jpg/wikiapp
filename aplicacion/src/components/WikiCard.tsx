import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NewWikiList } from "../interfaces/wikiResponse";
import { WikiParams } from "../navigator/WikiNavigation";
import { useState,useMemo } from "react";
import { Colors } from "../theme/appTheme";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";

interface Props {
    wiki: NewWikiList;
}

export const WikiCard = ({ wiki }: Props) => {
    const { colors } = useTheme();
    const styles = useMemo(() => createStyles(colors), [colors]);

    const navigation = useNavigation<StackNavigationProp<WikiParams>>();
    const [imageFailed, setImageFailed] = useState(false);

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("WikiDetail", { NewWikiList: wiki })}
        >
            <View style={styles.card}>
                <View style={styles.imageAndText}>
                    {wiki.image && !imageFailed && (
                        <Image
                            source={{ uri: wiki.image }}
                            style={styles.image}
                            onError={() => setImageFailed(true)}
                        />
                    )}
                    <View style={styles.textContainer}>
                        <Text style={styles.label} >{wiki.label}</Text>
                        <Text style={styles.id}>{wiki.id}</Text>
                        <Text style={styles.descripcion}>{wiki.description}</Text>
                    </View>
                </View>
                <Text style={styles.wikidataLink}>
                    <Ionicons name="globe-outline" size={16} color={colors.link} /> {wiki.url}
                </Text>

                <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.textid}
                    style={styles.arrowIcon}
                />
            </View>
        </TouchableOpacity>
    );
};
const createStyles = (colors: Colors) => StyleSheet.create({
    card: {
        padding: 14,
        marginVertical: 8,
        marginHorizontal: 4,
        borderRadius: 20,
        backgroundColor: colors.card,
        boxShadow:colors.box
    },
    textContainer:{
        flex:1
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.text,
        paddingRight: 24,
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 16,
        marginBottom: 8,
    },
    imageAndText: {
        flexDirection: 'row',
        gap: 14,
    },
    id: {
        fontSize:13,
        fontWeight:'600',
        color:colors.textid,
        marginTop:2,
        marginBottom:6,
    },
    descripcion: {
        fontSize:14,
        lineHeight:20,
        color:colors.text
    },
    wikidataLink:{
        fontSize:13,
        color:colors.link,
        marginTop:12,
    },
    arrowIcon: {
        position: 'absolute',
        top: 16,
        right: 14,
    },
})


