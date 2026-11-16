import { Claim } from "../interfaces/wikiResponse";

export const formatClaimValue = (claim: Claim, labels: Record<string, string>): string | undefined => {
    const dv = claim.mainsnak.datavalue;
    if (!dv) return undefined;

    switch (dv.type) {
        case "string":
            return dv.value;
        case "wikibase-entityid":
            return labels[dv.value.id] ?? dv.value.id;
        case "time":
            return dv.value.time.slice(1, 11).replace(/-00/g, "");
        case "quantity":
            return dv.value.amount.replace(/^\+/, "");
        case "monolingualtext":
            return dv.value.text;
        case "globecoordinate":
            return `${dv.value.latitude.toFixed(4)}, ${dv.value.longitude.toFixed(4)}`;
        default:
            return undefined;
    }
};