export function loadscript(src: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => reject(false);

    document.body.appendChild(script);
  });
}
