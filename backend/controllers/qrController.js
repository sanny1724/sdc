import { generateQRCode } from '../utils/qrGenerator.js';
import User from '../models/User.js';
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

    // Try to fetch minimal fields to embed into the QR URL as a fallback
    let minimal = null;
    try {
      const u = await User.findById(id).select('name bloodGroup emergencyContact');
      if (u) {
        minimal = {
          n: encodeURIComponent(u.name || ''),
          bg: encodeURIComponent(u.bloodGroup || ''),
          ecn: encodeURIComponent(u.emergencyContact?.name || ''),
          ecp: encodeURIComponent(u.emergencyContact?.phone || '')
        };
      }
    } catch (_err) {
      // ignore lookup failure; still generate URL without params
    }

    // Generate URL that points to the public profile page
    // Use local IP if FRONTEND_URL contains localhost, otherwise use the configured URL
    let frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    
    // If using localhost, replace with actual IP address for mobile scanning
    if (frontendUrl.includes('localhost') || frontendUrl.includes('127.0.0.1')) {
      const localIP = getLocalIP();
      frontendUrl = frontendUrl.replace('localhost', localIP).replace('127.0.0.1', localIP);
    }
    
    // Build URL with minimal query fallback so mobile scan can render even if API is unreachable,
    // or optionally inline HTML via data: URL for maximum portability.
    let profileUrl;
    const inlineMode = (process.env.QR_INLINE || '').toLowerCase() === 'true';
    if (inlineMode && minimal) {
      const html = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>Life Code – Emergency Profile</title>
    <style>
      body { font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Inter,system-ui,Arial,sans-serif; background:#0b1020; color:#eef2ff; margin:0; padding:32px; }
      .card { max-width:640px; margin:0 auto; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:16px; padding:24px; backdrop-filter: blur(10px); }
      h1 { margin:0 0 8px; font-size:28px; background:linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4); -webkit-background-clip:text; background-clip:text; color:transparent; }
      .row { margin:14px 0; padding:14px; border-radius:12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); }
      .label { display:block; font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:#a5b4fc; margin-bottom:6px; }
      .value { font-size:18px; color:#e5e7eb; }
      .tel { color:#93c5fd; text-decoration:none; }
      .footer { margin-top:16px; font-size:12px; color:#94a3b8; text-align:center; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Emergency Profile</h1>
      <div class="row"><span class="label">Name</span><span class="value">${decodeURIComponent(minimal.n || '')}</span></div>
      <div class="row"><span class="label">Blood Group</span><span class="value">${decodeURIComponent(minimal.bg || '')}</span></div>
      <div class="row"><span class="label">Emergency Contact</span><span class="value">${decodeURIComponent(minimal.ecn || '')}</span></div>
      <div class="row"><span class="label">Emergency Phone</span><span class="value"><a class="tel" href="tel:${decodeURIComponent(minimal.ecp || '')}">${decodeURIComponent(minimal.ecp || '')}</a></span></div>
      <div class="footer">Life Code – QR Identification</div>
    </div>
  </body>
</html>`;
      profileUrl = `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;
    } else {
      const query = minimal ? `?n=${minimal.n}&bg=${minimal.bg}&ecn=${minimal.ecn}&ecp=${minimal.ecp}` : '';
      profileUrl = `${frontendUrl}/profile/${id}${query}`;
    }
    
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

