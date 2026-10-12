import * as THREE from "three";

/**
 * Minimal polyfill/rasterizer for HTML in Canvas.
 * Rasterizes an HTMLElement into a <canvas> using SVG foreignObject,
 * creating a high-res THREE.CanvasTexture.
 */
export default class HtmlToCanvas {
  constructor(element, { width, height, pixelRatio = 2 } = {}) {
    this.element = element;
    this.pixelRatio = pixelRatio;
    this.extraCss = "";

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.generateMipmaps = false;

    this._rendering = false;
    this._pending = false;
    this._current = null;
    this.resize(width ?? window.innerWidth, height ?? window.innerHeight);
  }

  resize(width, height) {
    this.width = width;
    this.height = height;
  }

  async update() {
    if (this._rendering) {
      this._pending = true;
      return this._current;
    }

    this._rendering = true;
    this._current = (async () => {
      try {
        do {
          this._pending = false;
          const nextW = Math.floor(this.width * this.pixelRatio);
          const nextH = Math.floor(this.height * this.pixelRatio);
          if (nextW !== this.canvas.width || nextH !== this.canvas.height) {
            this.canvas.width = nextW;
            this.canvas.height = nextH;
            this.texture.dispose();
          }

          const url = this.#buildSvgDataUrl();
          const img = new Image();
          img.src = url;
          await img.decode();

          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);

          this.texture.needsUpdate = true;
        } while (this._pending);
      } catch (err) {
        console.warn("HtmlToCanvas update warning:", err);
      } finally {
        this._rendering = false;
        this._current = null;
      }
    })();

    return this._current;
  }

  #buildSvgDataUrl() {
    const serialized = new XMLSerializer().serializeToString(this.element);
    const styleBlock = this.extraCss
      ? `<style xmlns="http://www.w3.org/1999/xhtml">/*<![CDATA[*/${this.extraCss}/*]]>*/</style>`
      : "";

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}">
          <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="width:${this.width}px;height:${this.height}px;">
          ${styleBlock}
          ${serialized}
          </div>
          </foreignObject>
          </svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  dispose() {
    this.texture.dispose();
  }
}
