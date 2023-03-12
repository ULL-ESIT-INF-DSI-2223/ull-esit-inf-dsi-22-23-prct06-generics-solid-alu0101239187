import { Artist } from "./artist";
import { Disc } from "./disc";
import { Single } from "./single";
import { Song } from "./song";

export class MusicLibrary {
  /**
   * Constructor of the class MusicLibrary
   * @param _artists Artists
   * ```typescript
   * new MusicLibrary([new Artist(...), ...]);
   * ```
   */
  constructor(private _artists: Artist[]) {}

  get artists() {
    return this._artists;
  }

  /**
   * Adds an artist to the library
   * @param artist Artist to add
   * ```typescript
   * music_library = new MusicLibrary([new Artist(...), ...]);
   * music_library.addArtist(new Artist(...));
   * ```
   */
  public addArtist(artist: Artist): void {
    this.artists.push(artist);
  }

  /**
   * Adds a disc or single to the library
   * @param artist_name Name of the album's artist
   * @param album Disc or single to add
   * ```typescript
   * music_library = new MusicLibrary([new Artist(...), ...]);
   * music_library.addAlbum("Estopa, new Disc(...));
   * ```
   */
  public addAlbum(artist_name: string, album: Disc | Single): void {
    this.artists.forEach(function (artist) {
      if (artist.name === artist_name) {
        artist.discography.add(album);
      }
    });
  }

  /**
   * Adds a song to the library
   * @param artist_name Name of the song's artist
   * @param album_name Name of the song's disc or single
   * @param song Song to add
   * ```typescript
   * music_library = new MusicLibrary([new Artist(...), ...]);
   * music_library.addSong("Estopa, "Destrangis", new Song(...));
   * ```
   */
  public addSong(artist_name: string, album_name: string, song: Song): void {
    this.artists.forEach(function (artist) {
      if (artist.name === artist_name) {
        for (let index = 0; index < artist.discography.length(); index++) {
          const element = artist.discography.get(index);
          if (element instanceof Disc) {
            if (element.name === album_name) {
              element.songs.push(song);
            }
          } else if (element instanceof Single) {
            if (element.name === album_name) {
              element.song = song;
            }
          }
        }
      }
    });
  }

  /**
   * Shows and returns the collection of artists
   * @returns All artists
   * ```typescript
   * music_library = new MusicLibrary([new Artist(...), ...]);
   * music_library.showArtists();
   * ```
   */
  public showArtists(): Artist[] {
    console.table(this.artists);
    return this.artists;
  }

  /**
   * Show and returns the collection of discs and singles
   * @returns All albums
   * ```typescript
   * music_library = new MusicLibrary([new Artist(...), ...]);
   * music_library.showAlbums();
   * ```
   */
  public showAlbums(): (Disc | Single | undefined)[] {
    const elements: (Disc | Single | undefined)[] = [];
    this.artists.forEach(function (artist) {
      for (let index = 0; index < artist.discography.length(); index++) {
        elements.push(artist.discography.get(index));
      }
    });
    console.table(elements);
    return elements;
  }

  /**
   * Shows and returns the collection of songs
   * @returns All songs
   * ```typescript
   * music_library = new MusicLibrary([new Artist(...), ...]);
   * music_library.showSongs();
   * ```
   */
  public showSongs(): Song[] {
    const songs: Song[] | undefined = [];
    this.artists.forEach(function (artist) {
      for (let index = 0; index < artist.discography.length(); index++) {
        const element = artist.discography.get(index);
        if (element instanceof Disc) {
          element.songs.forEach((song) => songs.push(song));
        } else if (typeof element !== "undefined") {
          songs.push(element.song);
        }
      }
    });
    console.table(songs);
    return songs;
  }

  /**
   * Searchs and shows a collection of artists
   * @param artist_search Search term
   * @returns All artists that satisfy the search term
   * ```typescript
   * music_library = new MusicLibrary([new Artist(...), ...]);
   * music_library.searchArtists("Estopa");
   * ```
   */
  public searchArtists(artist_search: string): Artist[] {
    const result: Artist[] = this.artists.filter(function (artist) {
      return artist.name.toUpperCase().startsWith(artist_search.toUpperCase());
    });
    console.table(result);
    return result;
  }

  /**
   * Searchs and shows a collection of discs and singles
   * @param album_search Search term
   * @returns All discs and singles that satisfy the search term
   * ```typescript
   * music_library = new MusicLibrary([new Artist(...), ...]);
   * music_library.searchDiscs("Destrangis");
   * ```
   */
  public searchAlbums(album_search: string): (Disc | Single | undefined)[] {
    const result: (Disc | Single | undefined)[] = [];
    this.artists.forEach(function (artist) {
      for (let index = 0; index < artist.discography.length(); index++) {
        const element = artist.discography.get(index);
        if (typeof element !== "undefined") {
          if (
            element.name.toUpperCase().startsWith(album_search.toUpperCase())
          ) {
            result.push(element);
          }
        }
      }
    });
    console.table(result);
    return result;
  }

  /**
   * Searchs and shows a collection of songs
   * @param song_search Search term
   * @returns All songs that satisfy the search term
   * ```typescript
   * music_library = new MusicLibrary([new Artist(...), ...]);
   * music_library.searchSongs("Vino Tinto");
   * ```
   */
  public searchSongs(song_search: string): Song[] {
    const result: Song[] | undefined = [];
    this.artists.forEach(function (artist) {
      for (let index = 0; index < artist.discography.length(); index++) {
        const element = artist.discography.get(index);
        if (element instanceof Disc) {
          element.songs.forEach(function (song) {
            if (song.name.toUpperCase().startsWith(song_search.toUpperCase())) {
              result.push(song);
            }
          });
        } else if (typeof element !== "undefined") {
          if (
            element.song.name
              .toUpperCase()
              .startsWith(song_search.toUpperCase())
          ) {
            result.push(element.song);
          }
        }
      }
    });
    console.table(result);
    return result;
  }

  /**
   * Counts the number of songs in a disc or single
   * @param disc_search Search term
   * @returns Number of songs in an album
   * ```typescript
   * music_library = new MusicLibrary([new Artist(...), ...]);
   * music_library.countSongs("Destrangis") returns x
   * ```
   */
  public countSongs(disc_search: string): number {
    const elements: (Disc | Single | undefined)[] =
      this.searchAlbums(disc_search);
    if (elements.length === 0) {
      return 0;
    }
    if (elements[0] instanceof Disc) {
      return elements[0].songs.length;
    } else {
      return 1;
    }
  }

  /**
   * Returns the duration of a disc or single
   * @param disc_search Search term
   * @returns Duration of the album
   * ```typescript
   * music_library = new MusicLibrary([new Artist(...), ...]);
   * music_library.countSongs("Destrangis") returns x
   * ```
   */
  public getDuration(disc_search: string): number {
    const elements: (Disc | Single | undefined)[] =
      this.searchAlbums(disc_search);
    let duration = 0;
    if (elements[0] instanceof Disc) {
      elements[0].songs.forEach((song) => (duration += song.duration));
    } else if (typeof elements[0] !== "undefined") {
      duration = elements[0].song.duration;
    }
    return duration;
  }

  /**
   * Returns the total reproductions of the songs in a disc or single
   * @param disc_search Search term
   * @returns Total reproductions of the songs in an album
   * ```typescript
   * music_library = new MusicLibrary([new Artist(...), ...]);
   * music_library.getReproductions("Destrangis") returns x
   * ```
   */
  public getReproductions(disc_search: string): number {
    const elements: (Disc | Single | undefined)[] =
      this.searchAlbums(disc_search);
    let reproductions = 0;
    if (elements[0] instanceof Disc) {
      elements[0].songs.forEach(
        (song) => (reproductions += song.reproductions_number)
      );
    } else if (typeof elements[0] !== "undefined") {
      reproductions = elements[0].song.reproductions_number;
    }
    return reproductions;
  }
}
