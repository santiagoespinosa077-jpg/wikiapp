export interface Wikiapi {
    searchinfo:        Searchinfo;
    search:            Search[];
    "search-continue": number;
    success:           number;
}
export interface NewWikiList{
    id: string;
    label: string;
    description: string;
    url: string;

}

export interface Search {
    id:           string;
    title:        string;
    pageid:       number;
    concepturi:   string;
    repository:   Repository;
    url:          string;
    display:      Display;
    label:        string;
    description?: string;
    match:        Match;
    aliases?:     string[];
}

export interface Display {
    label:        Description;
    description?: Description;
}

export interface Description {
    value:    string;
    language: DescriptionLanguage;
}

export type DescriptionLanguage = "en";

export interface Match {
    type:     Type;
    language: MatchLanguage;
    text:     string;
}

export type MatchLanguage = "es";

export type Type = "alias" | "label";

export type Repository = "wikidata";

export interface Searchinfo {
    search: string;
}
