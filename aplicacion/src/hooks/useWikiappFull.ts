import{useState, useEffect, use } from 'react';
import{cachasheedApi} from '../api/cachasheedApi';
import{Entity} from '../interfaces/wikiResponse';

interface UseWikiFull{
	isLoading: boolean;
	wikiDetail: Entity;
}

export const useWikiFull = (id: string): UseWikiFull => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [wikiDetail, setWikiDetail] = useState<Entity>({} as Entity);

	const loadData = async () => {
		setIsLoading(true);
		const response = await cachasheedApi.get<Entity>(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${id}&props=labels|descriptions|claims&languages=es&format=json&origin=*`)
		setWikiDetail(response.data);
		setIsLoading(false);
	}
	useEffect(() => {
    loadData();
  },[]);

	return{isLoading, wikiDetail};
}