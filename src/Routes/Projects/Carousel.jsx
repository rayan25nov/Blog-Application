import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import styles from "./Carousel.module.css";
import projects from "./ProjectData.json";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const Carousel = () => {
  return (
    <div className={styles.carousel_container}>
      <Swiper
        modules={[EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3} // Show 3 slides with the middle one prominent
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        coverflowEffect={{
          rotate: 0, // No rotation
          stretch: 0,
          modifier: 1.5, // Modifier for scale
          slideShadows: true,
        }}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id} className={styles.swiper_slide}>
            <div className={styles.project_card}>
              <img src={project.image} alt={project.title} />
              <div className={styles.project_info}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href={project.vercel}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
