// Simple sound utility using Web Audio API for retro beeps
class SoundManager {
  constructor() {
    this.audioContext = null;
    this.enabled = true;
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playBeep(frequency = 800, duration = 0.1, volume = 0.1) {
    if (!this.enabled) return;
    
    try {
      this.init();
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'square'; // Retro square wave
      gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }
  }

  // Window open sound - ascending beep
  windowOpen() {
    this.playBeep(600, 0.08, 0.08);
    setTimeout(() => this.playBeep(800, 0.08, 0.08), 50);
  }

  // Window close sound - descending beep
  windowClose() {
    this.playBeep(800, 0.08, 0.08);
    setTimeout(() => this.playBeep(600, 0.08, 0.08), 50);
  }

  // Minimize sound - short beep
  windowMinimize() {
    this.playBeep(700, 0.05, 0.08);
  }

  // Click sound
  click() {
    this.playBeep(1000, 0.03, 0.06);
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

export const soundManager = new SoundManager();