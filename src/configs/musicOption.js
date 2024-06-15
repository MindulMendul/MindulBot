export class MusicOption {
  volume;
  ampl;
  mute;
  loop;
  skip;

  constructor(volume = 0.5, ampl = 0.2, mute = false, loop = false, skip = false) {
    this.volume = volume;
    this.ampl = ampl;
    this.mute = mute;
    this.loop = loop;
    this.skip = skip;
  }
}
