export class MusicOption {
  public volume: number;
  public ampl: number;
  public mute: boolean;
  public loop: boolean;
  public skip: boolean;

  constructor(volume = 0.5, ampl = 0.2, mute = false, loop = false, skip = false) {
    this.volume = volume;
    this.ampl = ampl;
    this.mute = mute;
    this.loop = loop;
    this.skip = skip;
  }
}
