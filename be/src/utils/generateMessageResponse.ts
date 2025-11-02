export function generateMessageResponse(
  url: string,
  type: string,
  status?: number
) {
  return `${status === 500 ? "Gagal" : "Berhasil"} ${
    type === "POST"
      ? "menambahkan"
      : type === "DELETE"
      ? "menghapus"
      : type === "PUT"
      ? "mengubah"
      : "mengambil"
  } data ${url}`;
}
