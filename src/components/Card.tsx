import type { MediaItem } from "../types/tmdb-type";
import { Icon } from "@iconify/react";
import placeholderImg from "../assets/placeholder.jpg";

interface CardProps {
  item: MediaItem;
}

export const Card = ({ item }: CardProps) => {
        const title = item.title || item.name || "—";
        const releaseYear = (
          item.release_date ||
          item.first_air_date ||
          "—"
        ).slice(0, 4);
        // Fallback to placeholder image if no poster or backdrop is available
        let imgUrl = placeholderImg;
        if (item.poster_path) {
          imgUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        } else if (item.backdrop_path) {
          imgUrl = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`;
        }

        // Ensure score displays with one decimal
        const score =
          item.vote_average !== undefined && item.vote_average !== null
            ? item.vote_average.toFixed(1)
            : "0.0";

        return (
          <div className="relative w-full max-w-48 lg:max-w-64 rounded-xl overflow-hidden group mx-auto">
            <img
              src={imgUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute bottom-0 left-0 w-full bg-black/80  p-2 text-sm">
              <h3 className="font-semibold truncate text-teal-200">{title}</h3>
              <div className="flex justify-between text-xs mt-1">
                <span>{releaseYear}</span>
                <span>
                  ⭐ {score}
                </span>
              </div>
            </div>
          </div>
        );
 }