import { useState, useRef, useEffect } from "react";
import { cachasheedApi } from "../api/cachasheedApi";
import { Wikiapi, Search, NewWikiList, Entity, WikiEntityResponse } from "../interfaces/wikiResponse";
import { getImageUrl } from "../helpers/getImageUrl";

export const useWikiPaginated = (search: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [simpleWikiList, setSimpleWikiList] = useState<NewWikiList[]>([]);
    const baseUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=es&uselang=es&limit=20&search=${encodeURIComponent(search)}`;
    const nextPageUrl = useRef<string | null>(baseUrl);
    const loadingRef = useRef<boolean>(false);

    const getEntities = async (ids: string[]): Promise<Record<string, Entity>> => {
        if (ids.length === 0) return {};
        try {
            const { data } = await cachasheedApi.get<WikiEntityResponse>(
                `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${encodeURIComponent(ids.join("|"))}&props=claims&format=json`
            );
            return data.entities;
        } catch (error) {
            console.log(error);
            return {};
        }
    };

    const loadWiki = async () => {
        if (loadingRef.current || !nextPageUrl.current) return;

        loadingRef.current = true;
        setIsLoading(true);

        try {
            const response = await cachasheedApi.get<Wikiapi>(nextPageUrl.current);
            const results = response.data.search;

            nextPageUrl.current = response.data["search-continue"]
                ? `${baseUrl}&continue=${response.data["search-continue"]}`
                : null;

            const entities = await getEntities(results.map(({ id }) => id));

            const list: NewWikiList[] = results.map(({ id, label, description, concepturi }) => ({
                id,
                label,
                description: description ?? "Sin descripcion",
                url: concepturi,
                image: getImageUrl(entities[id]),
            }));

            setSimpleWikiList((prev) => [...prev, ...list]);
        } catch (error) {
            console.log(error);
        } finally {
            loadingRef.current = false;
            setIsLoading(false);
        }
    };

    useEffect(() => {
        nextPageUrl.current = baseUrl;
        setSimpleWikiList([]);
        search && loadWiki();
    }, [search]);
    return { isLoading, loadWiki, simpleWikiList };
}