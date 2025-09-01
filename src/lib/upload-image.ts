export const uploadImage = async (file: File) => {
  let imgUrl: string | File = file;

  if (imgUrl instanceof File) {
    const formData = new FormData();
    formData.append("file", imgUrl);

    const res = await fetch("/api/upload", {
      body: formData,
      method: "POST",
    });

    const url = await res.json();
    imgUrl = url.url;
  }

  return imgUrl as string;
};
