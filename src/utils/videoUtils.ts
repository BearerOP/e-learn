
export function getVideoUrl(url: string): string {
    if (isYoutubeUrl(url)) {
      const videoId = getYoutubeVideoId(url);
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
  
  export function isYoutubeUrl(url: string): boolean {
    return url.includes('youtube.com') || url.includes('youtu.be');
  }
  
  function getYoutubeVideoId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }
  
  