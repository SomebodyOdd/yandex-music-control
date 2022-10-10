import { ProgressInfo } from "./ProgressInfo";
import { TrackInfo } from "./TrackInfo";

interface YandexAPI {
    __eventCallbacks__: { [key: string]: ((data?: any) => void)[] | undefined };

    //данные о текущем треке
    getCurrentTrack(): TrackInfo | null;
    //данные о следующем треке
    getNextTrack(): TrackInfo | null;
    //данные о предыдущем треке
    getPrevTrack(): TrackInfo | null;
    //данные о списке треков
    getTracksList(): TrackInfo[] | null;
    //индекс текущего трека в списке треков
    getTrackIndex(): number;
    //данные о текущем источнике воспроизведения
    getSourceInfo(): string;
    //подгрузка данных о треках в текущий список воспроизведения. В случае выставления флага ordered, треки будут загружаться с учётом порядка воспроизведения, а не положения в списке
    populate(fromIndex, after?: number, before?: number, ordered?: boolean): void;

    //проверка, что плеер запущен и не на паузе
    isPlaying(): boolean;
    //получение данных о доступности элементов управления
    getControls(): ControlInfo;
    //получение состояния шаффла (SHUFFLE_ON/SHUFFLE_OFF)
    getShuffle(): boolean | null;
    //получение состояния повтора треков (REPEAT_NONE/REPEAT_ALL/REPEAT_ONE)
    getRepeat(): boolean | 1 | null;
    //получние текущей громкости
    getVolume(): number;
    //получние текущей скорости
    getSpeed(): number;
    //получение данных о временных метриках трека
    getProgress(): ProgressInfo;

    //запуск воспроизведения трека с указанным индексом. Если индекс не указан, будет запущен текущий выбранный трек
    play(index?: number): Promise<boolean>;
    //переключение на следующий трек
    next(): Promise<boolean>;
    //переключение на предыдущий трек
    prev(): Promise<boolean>;
    //поставить трек на паузу/снять паузу
    togglePause(state?: boolean): void;
    //добавить трек в избранное/удалить трек из избранного
    toggleLike(): Promise<boolean>;
    //добавить трек в чёрный список/удалить трек из чёрного списка
    toggleDislike(): Promise<boolean>;
    //переключить режим шаффла (SHUFFLE_ON/SHUFFLE_OFF)
    toggleShuffle(state?: boolean): boolean;
    //переключить режим повтора треков (REPEAT_NONE/REPEAT_ALL/REPEAT_ONE)
    toggleRepeat(state?: boolean | 1): boolean | 1;
    //установить громкость
    setVolume(value: number): void;
    //установить скорость
    setSpeed(value: number): void;
    //включит/выключить звук
    toggleMute(state: boolean): void;
    //установить позицию воспроизведения
    setPosition(value: number): number;

    //готовность данного интерфейса
    EVENT_READY: string;
    //изменение состояния плеера
    EVENT_STATE: string;
    //смена трека
    EVENT_TRACK: string;
    //воспроизведение рекламы
    EVENT_ADVERT: string;
    //воспроизведение шота
    EVENT_SHOT: string;
    //изменение состояния элементов управления (в т.ч. смены состояния шаффла и повтора треков)
    EVENT_CONTROLS: string;
    //смена источника воспроизведения
    EVENT_SOURCE_INFO: string;
    //изменения списка треков
    EVENT_TRACKS_LIST: string;
    //изменение громкости
    EVENT_VOLUME: string;
    //изменение скорости
    EVENT_SPEED: string;
    //изменение временных метрик трека
    EVENT_PROGRESS: string;
}

interface ControlInfo {
    //возможность запускать воспроизведние трека по его индексу
    index: boolean;
    //возможность переключения на следующий трек
    next: boolean;
    //возможность переключение на предудущий трек
    prev: boolean;
    //возможность добавлять трек в избранное
    like: boolean;
    //возможность добавлять трек в чёрный список
    dislike: boolean;

    //возможность включать шаффл
    //по состоянию на 10.10.2022 - сломано
    //shuffle: boolean;
    //возможность включать режим повтора треков
    //по состоянию на 10.10.2022 - сломано
    //repeat: boolean;
}