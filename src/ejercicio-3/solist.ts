import { Artist } from "./artist";
import { Disc } from "./disc";
import { Discography } from "./discography";
import { Single } from "./single";

export enum VoiceTypes {
  SOPRANO,
  MEZZO_SOPRANO,
  CONTRALTO,
  COUNTERTENOR,
  TENOR,
  BARITONE,
  BASS,
}

export class Solist extends Artist {
  /**
   * Constructor of the class Solist
   * @param _name Solist name
   * @param _monthly_listeners Solist monthly listeners. Must be a positive integer
   * @param _discography Solist discography
   * @param _voice_type Solist voice type
   * ```typescript
   * new Solist("Kanye West", 950, [new Disc(...)], VoiceTypes.BARITONE)
   * ```
   */
  constructor(
    _name: string,
    _monthly_listeners: number,
    _discography: Discography<Disc, Single>,
    private _voice_type: VoiceTypes
  ) {
    super(_name, _monthly_listeners, _discography);
  }

  get voice_type() {
    return this._voice_type;
  }

  set voice_type(voice_type: VoiceTypes) {
    this._voice_type = voice_type;
  }
}
