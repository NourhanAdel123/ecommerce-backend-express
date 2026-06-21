import QRCode from "qrcode";

export const generate_QR = ({ data = "" } = {}) => {
  const qrcode = QRCode.toDataURL();
};
