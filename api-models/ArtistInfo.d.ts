import { CoverInfo } from "./CoverInfo";


export interface ArtistInfo {
    //имя исполнителя
    title: string;
    //ссылка на исполнителя
    link: string;
    //обложка
    cover?: CoverInfo;
}
