import { Swiper as SwiperJs, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { ReactNode } from 'react';
import { AutoplayOptions, NavigationOptions, PaginationOptions, SwiperOptions } from 'swiper/types';

interface IProps extends SwiperOptions {
    slidesPerView: number;
    className?: string;
    slides: ReactNode[]; // Array of content to be rendered in each slide
    spaceBetween?: number;
    loop?: boolean;
    pagination?: boolean | PaginationOptions;
    navigation?: boolean | NavigationOptions;
    autoplay?: boolean | AutoplayOptions;
    breakpoints?: Record<number, SwiperOptions>; // Customizable breakpoints for different screen sizes  (e.g., { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } })  // Default is { 0: { slidesPerView: 1 } }  // For more info, refer to https://swiperjs.com/react#breakpoints  // Note: breakpoints should be ordered from
}

const Swiper = ({
    slidesPerView,
    className = '',
    slides,
    spaceBetween = 50,
    loop = false,
    pagination = true,
    navigation = false,
    autoplay = false,
    breakpoints = {},
}: IProps) => {

    return (
        <SwiperJs
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            pagination={pagination ? { clickable: true } : false}
            navigation={navigation}
            loop={loop}
            autoplay={autoplay ? { delay: 2000 } : false}
            className={className}
            breakpoints={breakpoints}
        >
            {slides.map((slideContent, index) => (
                <SwiperSlide key={index}>
                    {slideContent}
                </SwiperSlide>
            ))}
        </SwiperJs>
    );
};

export default Swiper;
