import { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://pixabay.com/api/?key=${
        import.meta.env.VITE_PIXABEY_API_KEY
      }&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />
      {!loading && images.length === 0 && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 text-3xl font-bold text-gray-800 animate-pulse">
          No Images Found!
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 text-3xl font-bold text-gray-800 animate-pulse">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
