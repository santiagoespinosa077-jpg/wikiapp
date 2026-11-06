import { useState, useRef, useEffect } from "react";
import { cachasheedApi } from "../api/cachasheedApi";
import { Wikiapi, Search, NewWikiList } from "../interfaces/wikiResponse";

export const useWikiPaginated = (search: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [simpleWikiList, setSimpleWikiList] = useState<NewWikiList[]>([]);
    const baseUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=es&uselang=es&limit=20&search=${encodeURIComponent(search)}`;
    const nextPageUrl = useRef<string | null>(baseUrl);

    const loadWiki = async () => {
        setIsLoading(true);

        if (!nextPageUrl.current) {
            setIsLoading(false);
            return;
        }

        const response = await cachasheedApi.get<Wikiapi>(nextPageUrl.current);

        mapWikiList(response.data.search);
        nextPageUrl.current = response.data["search-continue"]
            ? `${baseUrl}&continue=${response.data["search-continue"]}`
            : null;
    }

    const mapWikiList = (data: Search[]) => {
        const list: NewWikiList[] = data.map(({ id, label, description, concepturi }) => {
            return {
                id,
                label,
                description: description ?? 'Sin descripcion',
                url: concepturi
            }
        });
        setSimpleWikiList((prevList) => [...prevList, ...list]);
        setIsLoading(false);
    }
    useEffect(() => {
        nextPageUrl.current = baseUrl;
        setSimpleWikiList([]);
        search && loadWiki();
    }, [search]);
    return { isLoading, loadWiki, simpleWikiList };
}