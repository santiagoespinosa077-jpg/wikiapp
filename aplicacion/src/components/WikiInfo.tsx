import { View, Text, FlatList, StyleSheet } from "react-native";
import { DetailRow } from "../interfaces/wikiResponse";

interface Props {
    rows: DetailRow[];
}

export const WikiInfo = ({ rows }: Props) => {
    return (
        <FlatList
            data={rows}
            keyExtractor={(row) => row.id}
            renderItem={({ item }) => (
                <View style={styles.row}>
                    <Text style={styles.property}>{item.label}</Text>
                    <Text style={styles.value}>{item.values.join(", ")}</Text>
                </View>
            )}
            ListEmptyComponent={<Text style={styles.empty}>Sin propiedades para mostrar</Text>}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    row: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#e5e5e5",
    },
    property: {
        fontSize: 13,
        fontWeight: "bold",
        color: "gray",
        textTransform: "capitalize",
    },
    value: {
        fontSize: 17,
        color: "black",
    },
    empty: {
        textAlign: "center",
        color: "gray",
        marginTop: 20,
    },
});