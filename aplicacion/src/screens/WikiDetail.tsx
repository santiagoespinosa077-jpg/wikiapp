import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { WikiParams } from "../navigator/WikiNavigation";
import { useWikiFull } from "../hooks/useWikiappFull";
import { WikiInfo } from "../components/WikiInfo";
import { formatClaimValue } from "../helpers/formatClaimValue";
import { DetailRow } from "../interfaces/wikiResponse";

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
                    <Text style={style.back}>{`← ${id}`}</Text>
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
    },
    header: {
        alignItems: "center",
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    back: {
        alignSelf: "flex-start",
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 8,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    label: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
    },
    description: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
    },
    loader: {
        marginTop: 30,
    },
});