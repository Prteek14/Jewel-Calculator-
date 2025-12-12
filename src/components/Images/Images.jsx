import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

function Images() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  function handleImageClick(id, src) {
    setSelectedImage({ id, src });
  }

  useEffect(() => {
    const query = "gold silver diamond rings and neckless";

    fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
        query
      )}&image_type=photo&per_page=52`
    )
      .then((res) => res.json())
      .then((data) => setImages(data.hits));
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold text-center mt-34 sm:text-2xl ">
        Explore Premium Jewellery Designs
      </h2>
      {/* Use webformatURL for clear grid images */}
      <div className="grid grid-cols-2 m-4 mb-3 sm:grid-cols-4 gap-4 p-4">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.webformatURL} // ⭐ Clear images, no blur
            className="object-cover w-full h-full rounded-lg shadow cursor-pointer"
            onClick={() => handleImageClick(img.id, img.largeImageURL)} // Full HD
          />
        ))}
      </div>

      {/* Fullscreen */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage.src}
            alt="preview"
            title="Right Click To Download"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-xl"
          />
        </div>
      )}
      <p className="text-center text-sm text-gray-500 mt-2">
        Images sourced from Pixabay
      </p>
    </>
  );
}

export default Images;
