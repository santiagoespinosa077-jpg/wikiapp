import { useState, useEffect } from 'react';
import { cachasheedApi } from '../api/cachasheedApi';
import { Wikiapi, NewWikiList, Entity, WikiEntityResponse } from '../interfaces/wikiResponse';
import { getImageUrl } from '../helpers/getImageUrl';

interface UseWikiSearch {
	isLoading: boolean;
	simpleWikiList: NewWikiList[];
}

export const useWikiSearch = (search: string): UseWikiSearch => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [simpleWikiList, setSimpleWikiList] = useState<NewWikiList[]>([]);

	const getEntities = async (ids: string[]): Promise<Record<string, Entity>> => {
		if (ids.length === 0) return {};
		try {
			const { data } = await cachasheedApi.get<WikiEntityResponse>(
				`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${ids.join('|')}&props=claims&format=json&origin=*`
			);
			return data.entities ?? {};
		} catch (error) {
			console.log(error);
			return {};
		}
	};

	useEffect(() => {
		let cancelled = false; // evita mezclar resultados de una búsqueda anterior

		const loadData = async () => {
			if (!search.trim()) {
				setSimpleWikiList([]);
				return;
			}
			setIsLoading(true);
			try {
				const response = await cachasheedApi.get<Wikiapi>(
					`https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&origin=*&language=es&uselang=es&limit=50&search=${encodeURIComponent(search)}`
				);
				const results = response.data.search ?? [];
				const entities = await getEntities(results.map(({ id }) => id));
				if (cancelled) return;

				setSimpleWikiList(
					results.map(({ id, label, description, concepturi }) => ({
						id,
						label,
						description: description ?? 'Sin descripcion',
						url: concepturi,
						image: getImageUrl(entities[id]),
					}))
				);
			} catch (error) {
				console.log(error);
			} finally {
				if (!cancelled) setIsLoading(false);
			}
		};

		loadData();
		return () => {
			cancelled = true;
		};
	}, [search]);

	return { isLoading, simpleWikiList };
};