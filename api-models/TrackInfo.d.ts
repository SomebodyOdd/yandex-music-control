import { CoverInfo } from './CoverInfo';
import { AlbumInfo } from './AlbumInfo';
import { ArtistInfo } from './ArtistInfo';

export interface TrackInfo {
    //название трека
    title: string;
    //ссылка на трек
    link: string;
    //длительность трека в секундах
    duration: number;
    //трек залайкан
    liked: boolean;
    //трек задислайкан
    disliked: boolean;
    //список исполнителей
    artists: ArtistInfo[];
    //версия трека
    version?: string;
    //альбом трека
    album?: AlbumInfo;
    //обложка
    cover?: CoverInfo;
}
