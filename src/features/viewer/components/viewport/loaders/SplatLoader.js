import { FileLoader, Loader } from 'three';
import { SplatMesh } from '../splat/SplatMesh';

export class SplatLoader extends Loader {
  constructor(manager) {
    super(manager);
  }

  load(url, onLoad, onProgress, onError) {
    const loader = new FileLoader(this.manager);
    loader.setResponseType('arraybuffer');
    loader.setRequestHeader(this.requestHeader);

    loader.load(
      url,
      (buffer) => {
        try {
          onLoad(this.parse(buffer));
        } catch (e) {
          if (onError) {
            onError(e);
          } else {
            console.error(e);
          }
          this.manager.itemError(url);
        }
      },
      onProgress,
      onError,
    );
  }

  parse(buffer) {
    const geometry = new SplatMesh();
    geometry.processBuffer(buffer);
    return geometry;
  }
}
