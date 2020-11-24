import React, { useEffect, useState } from "react";
import requireAuth from "./requireAuth";
import PlaylistPlaceholder from "./PlaylistPlaceholder";
const WalkmanInfo: React.FC<{}> = () => {
    const [isSpotifyLoaded, setIsSpotifyloaded] = useState(false);
    const [isAppleLoaded, setIsAppleloaded] = useState(false);
    //Youutbe has it's own placeholder when loaded
    return (
        <div className="musicWrap">
            <h1 className="musicTitle">Music In Peter Quil's Walkman</h1>
            <div className="spotifyAndApplePlaylistWrap">
                {!isSpotifyLoaded && <PlaylistPlaceholder />}
                {!isAppleLoaded && <PlaylistPlaceholder />}
                <iframe
                    className="playlist"
                    src="https://open.spotify.com/embed/playlist/3mAhwvPeRnzMf9ZIvCVtpt"
                    frameBorder="0"
                    allow="encrypted-media"
                    title="spotify playlist for guardians of the galaxy's walkman soundtrack"
                    onLoad={() => {
                        setIsSpotifyloaded(true);
                    }}
                    data-testid="spotifyPlaylist"
                ></iframe>

                <iframe
                    className="playlist"
                    allow="autoplay *; encrypted-media *;"
                    frameBorder="0"
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                    src="https://embed.music.apple.com/us/playlist/guardians-of-the-galaxy/pl.c7183fd379694af4896a1b4d7dc85d30"
                    title="apple playlist for guardians of the galaxy's walkman soundtrack"
                    onLoad={() => {
                        setIsAppleloaded(true);
                    }}
                ></iframe>
            </div>
            <div className="youtubeSoundtrackContainer">
                <iframe
                    className="youtubeSoundtrack"
                    src="https://www.youtube.com/embed/Kt-tLuszKBA"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="youtube link for guardians of the galaxy's walkman soundtrack"
                ></iframe>
            </div>
        </div>
    );
};

export default requireAuth(WalkmanInfo);
