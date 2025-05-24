import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ExternalLink, Maximize } from "lucide-react";
import axios from "axios";
import API_ENDPOINT from "@/api_config";
import Image from "next/image";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_ENDPOINT}/api/project-images/`);
        const data = response.data;
        if (!data) {
          throw new Error('Failed to fetch images');
        }
        setImages(data);
        console.log("Image Data: ", data);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load gallery images. Please try again later.');
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Calculate pagination
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(images.length / imagesPerPage);

  // Group images in rows of 3 for desktop view
  const imageRows = [];
  for (let i = 0; i < currentImages.length; i += 3) {
    imageRows.push(currentImages.slice(i, i + 3));
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24">
        <div className="mb-6 text-red-500">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
        <p className="text-gray-500 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="mb-6 text-gray-400">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">No images yet</h3>
        <p className="text-gray-500 dark:text-gray-400">Check back soon for exciting alumni projects</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Gallery Title */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
        <div className="w-24 h-1 bg-green-600 mx-auto"></div>
      </div>

      {/* Gallery Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {imageRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {row.map((image, imageIndex) => (
              <motion.div
                key={`${rowIndex}-${imageIndex}`}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                onClick={() => openModal(image)}
              >
                <div className="relative aspect-video overflow-hidden cursor-pointer">
                  <Image
                    height={300}
                    width={350}
                    src={image.image}
                    alt={image.caption || `Project image ${imageIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white font-medium truncate">{image.caption || "Alumni project"}</p>
                    <div className="flex items-center text-white/80 text-sm mt-1">
                      <Maximize size={14} className="mr-1" />
                      <span>Click to expand</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </motion.div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-12">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="p-2 rounded-full border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X size={28} />
            </button>

            <div className="bg-black rounded-lg overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  height={600}
                  width={800}
                  src={selectedImage.image}
                  alt={selectedImage.caption || "Project image"}
                  className="w-full h-full object-contain "
                />
              </div>

              {selectedImage.caption && (
                <div className="p-4 bg-black/80">
                  <p className="text-white text-lg font-medium">{selectedImage.caption}</p>
                  {selectedImage.project && (
                    <a
                      href={`/projects/${selectedImage.project.id}`}
                      className="inline-flex items-center text-green-400 hover:text-green-300 mt-2 text-sm"
                    >
                      View project details <ExternalLink size={14} className="ml-1" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;