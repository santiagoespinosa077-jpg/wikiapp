import{useState, useEffect, use } from 'react';
import{wikiApi} from '../api/wikiApi';
import{Search} from '../interfaces/wikiResponse';

interface UseWikiFull{
	isLoading: boolean;
	wikiDetail: Entity;
}

export const useWikiFull = (id: string): UseWikiFull => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [wkiDetail, setWikiDetail] = useState<Search>({} as Search);

	const loadData = async () => {
		setIsLoading(true);
		const response = await wikiApi.get<Search>(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${id}&props=labels|descriptions|claims&languages=es&format=json&origin=*`)
		setWikiDetail(response.data);
		setIsLoading(false);
	}
	useEffect(() => {
    loadData();
  },[]);

	return{isLoading, wikiDetail};
}