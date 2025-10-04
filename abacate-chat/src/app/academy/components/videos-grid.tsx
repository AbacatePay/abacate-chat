"use client";

import { useState, useMemo } from "react";
import { videos, InterfaceVideo } from "@/app/services/videos";
import { VideoCard } from "./video-card";
import { VideoFilters } from "./video-filters";
import { SearchAcademy } from "./search-academy";

export function VideosGrid() {
  const [selectedTab, setSelectedTab] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = useMemo(() => {
    return videos.filter((video: InterfaceVideo) => {
      const matchesTab =
        selectedTab === "todos" || video.category.includes(selectedTab);
      const matchesSearch =
        searchQuery === "" ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.category.some((cat) =>
          cat.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesTab && matchesSearch;
    });
  }, [selectedTab, searchQuery]);

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <SearchAcademy onSearchChange={setSearchQuery} />

      {/* Filters */}
      <VideoFilters selectedTab={selectedTab} onTabChange={setSelectedTab} />

      {/* Results count */}
      {searchQuery && (
        <p className="text-sm text-soft-400">
          {filteredVideos.length}{" "}
          {filteredVideos.length === 1 ? "resultado" : "resultados"} encontrado
          {filteredVideos.length !== 1 && "s"}
        </p>
      )}

      {/* Videos Grid */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-24 justify-center text-center">
          <p className="text-lg font-semibold text-foreground">
            Nenhum vídeo encontrado
          </p>
          <p className="mt-2 text-sm text-soft-400">
            Tente ajustar sua pesquisa ou filtros
          </p>
        </div>
      )}
    </div>
  );
}
