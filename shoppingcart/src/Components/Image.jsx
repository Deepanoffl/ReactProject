const Image = ({ src, alt, className, onClick}) => {
  return (
    <img src={src} alt={alt} onClick={onClick} className={className}/>
  )
}

export default Image;