import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Card } from './Card';
import { useEffect, useState } from 'react';
import type { MediaItem } from '../types/tmdb-type';


type SliderProps = {
    sliderTitle: string;
    fetchData: () => Promise<MediaItem[]>;
}

export const MediaSlider = ({ sliderTitle, fetchData }: SliderProps) => {
const [items, setItems] = useState<MediaItem[]>([]);
const [ref, slider] = useKeenSlider<HTMLDivElement>({
       breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 668px)": {
        slides: { perView: 3, spacing: 5 },
      },
      "(min-width: 924px)": {
        slides: { perView: 4, spacing: 5 },
      },
    },
    slides: { perView: 1 },
})

// Fetch data when the component mounts
  useEffect(() => {
    const load = async () => {
      const data = await fetchData();
      setItems(data);
    };
    load();
  }, [fetchData]);

  // Update the slider when items change
  useEffect(() => {
    if (slider.current) {
      slider.current.update();
    }
  }, [items, slider]);

return (
    <section className='w-full max-w-screen-xl mt-8 px-2 overflow-hidden'>
        <h2 className='py-3 text-left tracking-wider mb-1'>{sliderTitle}</h2>
        <div ref={ref} className='keen-slider'>
            {items.map((item) => (
              <div key={item.id} className='keen-slider__slide'>
                <Card
                key={item.id}
                item={item}
              />
              </div>
            ))}
        </div>
    </section>
)
}