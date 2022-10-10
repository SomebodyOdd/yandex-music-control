import { ArtistInfo } from "./ArtistInfo";
import { CoverInfo } from "./CoverInfo";

export interface AlbumInfo {
    //название альбома
    title: string;
    //год выпуска
    year: number;
    //ссылка на альбом
    link: string;
    //список исполнителей
    artists: ArtistInfo[];
    //обложка
    cover?: CoverInfo;
}
