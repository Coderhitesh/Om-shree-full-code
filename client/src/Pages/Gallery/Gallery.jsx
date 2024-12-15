import React, { useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import "./gallery.css";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "./img1.webp";
import img2 from "./img2.webp";
import img3 from "./img3.webp";
import img4 from "./img4.webp";
import img5 from "./img5.webp";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Breadcrumb title={"Gallery"} />
      <div className="container my-3 gallery-section">
        <div className="row g-3">
          {[img1, img2, img3, img4, img5].map((img, index) => (
            <div className="col-md-4" key={index}>
              <div className="img" onClick={() => handleImageClick(img)}>
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="img-fluid"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Image */}
      {selectedImage && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={handleCloseModal}
        >
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Image Preview</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <img
                style={{height:"500px"}}
                  src={selectedImage}
                  alt="Selected"
                  className="img-fluid w-100"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Gallery;
