import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import styles from "./Carousel.module.css";
import projects from "./ProjectData.json";
import "swiper/css";
import "swiper/css/effect-coverflow";
import ProjectCard from "./ProjectCard";

const Carousel = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.on("slideChange", () => {
        const { realIndex, slides } = swiperInstance;

        // Reverse autoplay direction after reaching the last or first slide
        if (realIndex === slides.length - 1 || realIndex === 0) {
          swiperInstance.params.autoplay.reverseDirection =
            !swiperInstance.params.autoplay.reverseDirection;
          swiperInstance.autoplay.start();
        }
      });
    }
  }, [swiperInstance]);

  return (
    <div className={styles.carousel_container}>
      <Swiper
        modules={[EffectCoverflow, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          reverseDirection: false,
        }}
        onSwiper={setSwiperInstance} // Get the Swiper instance
        loop={false} // Do not loop; reverse direction instead
        breakpoints={{
          // Disable EffectCoverflow and use simple settings for small screens
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
            effect: "slide", // Regular sliding effect
          },
          768: {
            slidesPerView: 3,
            effect: "coverflow", // Enable EffectCoverflow for larger screens
          },
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 60,
          depth: 200,
          modifier: 1.2,
          slideShadows: false,
        }}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index} className={styles.swiper_slide}>
            <ProjectCard project={project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
