import {
  BufferGeometry,
  Float32BufferAttribute,
  DataTexture,
  RGBAFormat,
  FloatType,
  Vector3,
  Matrix4,
} from 'three';

export class SplatMesh extends BufferGeometry {
  constructor() {
    super();
    this.type = 'SplatMesh';
  }

  processBuffer(buffer) {
    const dataView = new DataView(buffer);
    let offset = 0;

    // Header
    const versionMajor = dataView.getUint32(offset, true);
    offset += 4;
    const versionMinor = dataView.getUint32(offset, true);
    offset += 4;
    const headerSize = dataView.getUint32(offset, true);
    offset += 4;
    const splatCount = dataView.getUint32(offset, true);
    offset += 4;
    const bucketSize = dataView.getUint32(offset, true);
    offset += 4;
    const bucketCount = dataView.getUint32(offset, true);
    offset += 4;
    const bytesPerSplat = 32;

    // Skip to end of header
    offset = headerSize;

    // Splat data
    const positions = new Float32Array(splatCount * 3);
    const scales = new Float32Array(splatCount * 3);
    const rotations = new Float32Array(splatCount * 4);
    const colors = new Float32Array(splatCount * 4);

    for (let i = 0; i < splatCount; i++) {
      // Position
      positions[i * 3] = dataView.getFloat32(offset, true);
      positions[i * 3 + 1] = dataView.getFloat32(offset + 4, true);
      positions[i * 3 + 2] = dataView.getFloat32(offset + 8, true);
      offset += 12;

      // Scale
      scales[i * 3] = Math.exp(dataView.getFloat32(offset, true));
      scales[i * 3 + 1] = Math.exp(dataView.getFloat32(offset + 4, true));
      scales[i * 3 + 2] = Math.exp(dataView.getFloat32(offset + 8, true));
      offset += 12;

      // Rotation (quaternion)
      rotations[i * 4] = dataView.getFloat32(offset, true);
      rotations[i * 4 + 1] = dataView.getFloat32(offset + 4, true);
      rotations[i * 4 + 2] = dataView.getFloat32(offset + 8, true);
      rotations[i * 4 + 3] = dataView.getFloat32(offset + 12, true);
      offset += 16;

      // Color (RGBA)
      colors[i * 4] = dataView.getFloat32(offset, true);
      colors[i * 4 + 1] = dataView.getFloat32(offset + 4, true);
      colors[i * 4 + 2] = dataView.getFloat32(offset + 8, true);
      colors[i * 4 + 3] = dataView.getFloat32(offset + 12, true);
      offset += 16;
    }

    this.setAttribute('position', new Float32BufferAttribute(positions, 3));
    this.setAttribute('scale', new Float32BufferAttribute(scales, 3));
    this.setAttribute('rotation', new Float32BufferAttribute(rotations, 4));
    this.setAttribute('color', new Float32BufferAttribute(colors, 4));

    return this;
  }
}
