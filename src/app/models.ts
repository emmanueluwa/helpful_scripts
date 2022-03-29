export interface Career {
    background_image: string;
    name: string;
    genres: Array<Genre>;
    publishers: Array<Publishers>;
    ratings: Array<Rating>;
    trailers: Array<Trailer>;
    parent_platforms: Array<ParentPlatform>
    metacritic: number;
    metacritic_url: string;
    released: string;
    screenshots: Array<Screenshots>;
}

export interface APIResponse<T> {
  results: Array<T>;
}

interface Publishers {
  name: string
}

interface Rating {
  id: number;
  count: number;
  title: string;
}

interface Trailer {
  data: {
    max: string;
  };
}

interface ParentPlatform {
  platform: {
    name: string;
    slug: string;
  }
}

interface Screenshots {
  image: string;
}

