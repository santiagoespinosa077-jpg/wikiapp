import { useState, useEffect } from 'react';
import { cachasheedApi } from '../api/cachasheedApi';
import { Entity, WikiEntityResponse } from '../interfaces/wikiResponse';

interface UseWikiFull {
	isLoading: boolean;
	wikiDetail: Entity;
	labels: Record<string, string>;
}

const getLabels = async (ids: string[]): Promise<Record<string, string>> => {
	const labels: Record<string, string> = {};
	for (let i = 0; i < ids.length; i += 50) {
		const chunk = ids.slice(i, i + 50).join('|');
		try {
			const { data } = await cachasheedApi.get<WikiEntityResponse>(
				`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${chunk}&props=labels&languages=es|en&format=json&origin=*`
			);
			Object.entries(data.entities ?? {}).forEach(([key, entity]) => {
				const label = entity.labels?.es?.value ?? entity.labels?.en?.value;
				if (label) labels[key] = label;
			});
		} catch (error) {
			console.log(error);
		}
	}
	return labels;
};

export const useWikiFull = (id: string): UseWikiFull => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [wikiDetail, setWikiDetail] = useState<Entity>({} as Entity);
	const [labels, setLabels] = useState<Record<string, string>>({});

	const loadData = async () => {
		setIsLoading(true);
		try {
			const response = await cachasheedApi.get<WikiEntityResponse>(
				`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${id}&props=labels|descriptions|claims&languages=es&format=json&origin=*`
			);
			
			const entity = response.data.entities[id];

			
			const ids = new Set<string>(Object.keys(entity.claims ?? {}));
			Object.values(entity.claims ?? {}).forEach((claims) =>
				claims.forEach((c) => {
					const dv = c.mainsnak.datavalue;
					if (dv?.type === 'wikibase-entityid') ids.add(dv.value.id);
				})
			);

			setLabels(await getLabels([...ids]));
			setWikiDetail(entity);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadData();
	}, [id]);

	return { isLoading, wikiDetail, labels };
};