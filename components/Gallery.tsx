export default function Gallery() {
  const images = ["/villa1.jpg", "/villa2.jpg", "/villa3.jpg"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {images.map((img, i) => (
        <img key={i} src={img} className="rounded-xl" />
      ))}
    </div>
  );
}
