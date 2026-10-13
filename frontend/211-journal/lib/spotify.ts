import { unstable_cache } from "next/cache";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const RECENTLY_PLAYED_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

export type Track = {
    title: string;
    artist: string;
    coverUrl: string;
    url: string;
};

// Trades the long-lived refresh token for a 1-hour access token
async function getAccessToken(): Promise<string | null> {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) return null;

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.access_token ?? null;
}

async function fetchLastPlayedTrack(): Promise<Track | null> {
    try {
        const accessToken = await getAccessToken();
        if (!accessToken) return null;

        const response = await fetch(RECENTLY_PLAYED_URL, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!response.ok) return null;

        const data = await response.json();
        const track = data.items?.[0]?.track;
        if (!track) return null;

        return {
            title: track.name,
            artist: track.artists.map((artist: { name: string }) => artist.name).join(", "),
            // images are sorted largest first: 640px, 300px, 64px
            coverUrl: track.album.images[1]?.url ?? track.album.images[0]?.url,
            url: track.external_urls.spotify,
        };
    } catch {
        return null;
    }
}

// Spotify is asked at most once a minute, no matter how many visitors
export const getLastPlayedTrack = unstable_cache(
    fetchLastPlayedTrack,
    ["spotify-last-played"],
    { revalidate: 60 }
);
