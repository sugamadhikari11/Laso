
import {proxy} from 'valtio';

const state = proxy({
    intro: true,
    color: '#FF0000',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './laso.png',
    fullDecal: './trial.png',
    canvasOffsetRight: true 
});

export default state;