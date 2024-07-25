Mesh（网格）:
   - Mesh是Three.js中用来表示3D物体的基本单位。
   - 它由几何体（Geometry）和材质（Material）组成。
   - Mesh是您在场景中实际看到和操作的对象。

Material（材质）:
   - Material定义了Mesh的外观属性，如颜色、光泽度等。
   - 它决定了3D对象如何响应光照。
   - Material可以应用于Mesh，以控制其视觉效果。

Texture（纹理）:
   - Texture是一种可以应用到Material上的图像。
   - 它为Material添加细节和真实感。
   - Texture通常是一个2D图像，被"包裹"到3D对象的表面上。

关系总结：
- Mesh使用Material来定义其外观。
- Material可以包含Texture来增加细节和真实感。
- Texture被应用到Material上，然后Material被应用到Mesh上。

可以将Mesh想象成一个物体的形状，Material是这个物体的"皮肤"，而Texture则是这个"皮肤"上的"图案"或"纹路"。
