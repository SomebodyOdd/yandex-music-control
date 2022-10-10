import { CoverInfo } from "./CoverInfo";


export interface PlaylistInfo {
    //название плейлиста
    title: string;
    //имя владельца плейлиста
    owner: string;
    //ссылка на плейлист
    link: string;
    //обложка
    cover?: CoverInfo;
}
