import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { WikiParams } from "../navigator/WikiNavigation";
import { useWikiFull } from "../hooks/useWikiappFull";
import { WikiInfo } from "../components/WikiInfo";
import { formatClaimValue } from "../helpers/formatClaimValue";
import { DetailRow } from "../interfaces/wikiResponse";
import { colors } from "../theme/appTheme";
import { Ionicons } from "@expo/vector-icons";
interface Props extends StackScreenProps<WikiParams, "WikiDetail"> { }

export const WikiDetail = ({ navigation, route }: Props) => {
    const data = route.params.NewWikiList;
    const { id, label, description, image } = data;
    const { isLoading, wikiDetail, labels } = useWikiFull(id);

    // Se omiten identificadores externos y archivos de Commons (la imagen ya se muestra arriba)
    const rows: DetailRow[] = Object.entries(wikiDetail.claims ?? {}).flatMap(([propId, claims]) => {
        const values = claims
            .filter((c) => c.mainsnak.datatype !== "external-id" && c.mainsnak.datatype !== "commonsMedia")
            .slice(0, 10)
            .map((c) => formatClaimValue(c, labels))
            .filter((v): v is string => !!v);
        return values.length > 0 ? [{ id: propId, label: labels[propId] ?? propId, values }] : [];
    });

    return (
        <View style={style.container}>
            <View style={style.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={style.back}>
                        <Ionicons name="chevron-back" size={16} color={colors.text} /> {id}
                    </Text>
                </TouchableOpacity>

                {image && <Image source={{ uri: image }} style={style.image} resizeMode="contain" />}

                <Text style={style.label}>{label}</Text>
                {description && <Text style={style.description}>{description}</Text>}
            </View>

            {isLoading
                ? <ActivityIndicator style={style.loader} size="large" color="blue" />
                : <WikiInfo rows={rows} />
            }
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    header: {
        alignItems: "flex-start",
        paddingHorizontal: 18,
        paddingBottom: 12,
    },
    back: {
        alignSelf: "flex-start",
        fontSize: 18,
        color: colors.text,
        backgroundColor: colors.chip,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius:20,
        overflow: "hidden",
        fontWeight: "600",
        marginVertical: 8,
        
    },
    image: {
        width: "100%",
        height: 220,
        borderRadius: 20,
        marginVertical: 12,
    },
    label: {
        fontSize: 30,
        fontWeight: "800",
        textAlign: "left",
        color: colors.text
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        textAlign: "left",
        color: colors.text,
        marginTop: 4,
    },
    loader: {
        marginTop: 30,
    },
});