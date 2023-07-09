const mongoose = require('mongoose');
const qr = require('qrcode');

const qrCodeSchema = new mongoose.Schema({
    data: {
      type: String,
      required: true
    },
    qrCodeDataUrl: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const QRCodeModel = mongoose.model('QRCode', qrCodeSchema);
  