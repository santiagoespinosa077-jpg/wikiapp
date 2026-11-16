import { Entity } from "../interfaces/wikiResponse";

export const getImageUrl = (entity?: Entity): string | undefined => {
    const fileName = entity?.claims?.P18?.[0]?.mainsnak?.datavalue?.value;
    if (typeof fileName !== "string") return undefined;

    const commonsUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=300`;
    return `https://wsrv.nl/?url=${encodeURIComponent(commonsUrl)}&w=300&output=png`;
};