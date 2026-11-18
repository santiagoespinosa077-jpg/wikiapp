import { View, Text, FlatList, StyleSheet } from "react-native";
import { DetailRow } from "../interfaces/wikiResponse";
import { Colors } from "../theme/appTheme";
import { useMemo } from "react";
import { useTheme } from "../theme/ThemeContext";
interface Props {
    rows: DetailRow[];
}

export const WikiInfo = ({ rows }: Props) => {
    const { colors } = useTheme();
    const styles = useMemo(() => createStyles(colors), [colors]);
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
const createStyles = (colors: Colors) => StyleSheet.create({
    list: {
        paddingHorizontal: 18,
        marginBottom: 24,
        marginHorizontal: 16,
        borderRadius: 20,
        backgroundColor: colors.card
    },
    row: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.chip
    },
    property: {
        fontSize: 12,
        fontWeight: "600",
        color: colors.link,
        textTransform: "capitalize",
        marginBottom: 2,
    },
    value: {
        fontSize: 16,
        color: colors.text,
        lineHeight:24
    },
    empty: {
        textAlign: "center",
        color: colors.text,
        marginTop: 20,
    },
});