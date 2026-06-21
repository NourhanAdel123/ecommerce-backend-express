import QRCode from "qrcode";

export const generate_QR = ({ data = "" } = {}) => {
  const qrcode = QRCode.toDataURL(JSON.stringify(data), {
    errorCorrectionLevel: "H",
    color: "red",
  });
  return qrcode;
};
