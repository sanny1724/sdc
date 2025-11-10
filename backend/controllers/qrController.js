import { generateQRCode } from '../utils/qrGenerator.js';
import os from 'os';

// Helper function to get local IP address
const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
};

// Generate QR code for user profile
export const generateQR = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    // Generate URL that points to the public profile page
    // Use local IP if FRONTEND_URL contains localhost, otherwise use the configured URL
    let frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    
    // If using localhost, replace with actual IP address for mobile scanning
    if (frontendUrl.includes('localhost') || frontendUrl.includes('127.0.0.1')) {
      const localIP = getLocalIP();
      frontendUrl = frontendUrl.replace('localhost', localIP).replace('127.0.0.1', localIP);
    }
    
    const profileUrl = `${frontendUrl}/profile/${id}`;
    
    // Generate QR code
    const qrCodeDataURL = await generateQRCode(profileUrl);

    res.status(200).json({
      success: true,
      data: {
        qrCode: qrCodeDataURL,
        profileUrl: profileUrl,
        userId: id
      }
    });
  } catch (error) {
    console.error('Generate QR error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating QR code',
      error: error.message
    });
  }
};

