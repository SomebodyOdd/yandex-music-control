function registerYandexEventHandler(event: string, handler: () => void) {
    let existingEvents = externalAPI.__eventCallbacks__[event];

    if (!existingEvents || !Array.isArray(existingEvents))
        existingEvents = externalAPI.__eventCallbacks__[event] = [];

    existingEvents.push(handler);
}

function handleProgress() {
    let current = externalAPI.getProgress();

    if (!current)
        navigator.mediaSession.setPositionState();
    else {
        let obj = {
            duration: current.duration, playbackRate: externalAPI.getSpeed(), position: current.position
        };
        navigator.mediaSession.setPositionState(obj);

    }
}

async function handleNext() {
    await externalAPI.next();
}

async function handlePrevious() {
    await externalAPI.prev();
}

function handlePause() {
    externalAPI.togglePause(true);
}

function handlePlay() {
    externalAPI.togglePause(false);
}

function handleStop() {
    externalAPI.togglePause(true);
    externalAPI.setPosition(0);
}

function handleStateChange() {
    if (externalAPI.isPlaying())
        navigator.mediaSession.playbackState = 'playing';
    else if (externalAPI.getCurrentTrack() != null)
        navigator.mediaSession.playbackState = 'paused';
    else
        navigator.mediaSession.playbackState = 'none';
}

function clamp(num: number, min: number, max: number) {
    return Math.min(Math.max(num, min), max);
}

function handleSeekOffset(offset: number = 10, backward: boolean = false, fastSeek: boolean = false) {
    if (externalAPI.isPlaying()) {
        const progress = externalAPI.getProgress();
        let seekPosition = progress.position + (backward ? -offset : offset);

        seekPosition = clamp(seekPosition, 0, fastSeek ? progress.loaded - 0.5 : progress.duration);
    }
}

function handleSeekTo(position: number, fastSeek: boolean = false) {
    if (externalAPI.isPlaying()) {
        const progress = externalAPI.getProgress();
        let seekPosition = position;

        seekPosition = clamp(seekPosition, 0, fastSeek ? progress.loaded - 0.5 : progress.duration);
    }
}

function syncControlState() {
    const control = externalAPI.getControls();

    navigator.mediaSession.setActionHandler('nexttrack', control.next ? handleNext : null);
    navigator.mediaSession.setActionHandler('previoustrack', control.prev ? handlePrevious : null);
    navigator.mediaSession.setActionHandler('pause', handlePause);
    navigator.mediaSession.setActionHandler('play', handlePlay);
    navigator.mediaSession.setActionHandler('stop', handleStop);
    navigator.mediaSession.setActionHandler('seekbackward', d => handleSeekOffset(d.seekOffset, true, d.fastSeek));
    navigator.mediaSession.setActionHandler('seekforward', d => handleSeekOffset(d.seekOffset, false, d.fastSeek));
    navigator.mediaSession.setActionHandler('seekto', d => handleSeekTo(d.seekTime, d.fastSeek));
}

function handleTrackChange() {
    const track = externalAPI.getCurrentTrack();
    if (!track)
        return;

    const sizes = [400, 300, 200, 100, 80, 50, 30];
    let covers: MediaImage[];
    if (track.cover) {
        covers = sizes.map(s => {
            return {
                src: `https://${track.cover.replace('%%', s + 'x' + s)}`,
                sizes: s + 'x' + s
            }
        });
        console.log(covers);
    }
    else covers = [];
    const metadata: MediaMetadataInit = {
        title: `${track.title} ${track.version ?? ''}`.trim(),
        artist: track.artists.map(a => a.title).join(', '),
        album: track.album?.title ?? '',
        artwork: covers
    };

    console.log(metadata);
    navigator.mediaSession.metadata = new MediaMetadata(metadata);
}

registerYandexEventHandler(externalAPI.EVENT_PROGRESS, handleProgress);
registerYandexEventHandler(externalAPI.EVENT_STATE, handleStateChange);
registerYandexEventHandler(externalAPI.EVENT_TRACK, handleTrackChange);
registerYandexEventHandler(externalAPI.EVENT_CONTROLS, syncControlState);

syncControlState();