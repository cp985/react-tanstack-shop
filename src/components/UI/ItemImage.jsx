export default function ItemImage ({ spritePosX, spritePosY, size = 64 }){
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundImage: `url('../../assets/sprite64x64.webp')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: `-${spritePosX}px -${spritePosY}px`,
    imageRendering: 'pixelated', 
    display: 'inline-block'
  };

  return <div style={style} className="item-sprite" />;
};