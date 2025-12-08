import xss from "xss";

export interface Payload {
  [key: string]: string | number;
}

export const validatePayloadXSS = (payload: Payload) => {
  for (const [key, value] of Object.entries(payload)) {
    // validasi kosong: hanya untuk string
    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "")
    ) {
      return `${key} tidak boleh kosong`;
    }

    // sanitasi XSS hanya untuk string
    if (typeof value === "string") {
      payload[key] = xss(value);
    }
  }

  return null; // semua valid
};

export const validateDateType = (date: Date) => {
  const dates = new Date(date);

  return !isNaN(dates.getTime());
};
