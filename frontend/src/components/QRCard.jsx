const QRCard = ({ qrCode, profileUrl, userId, onDownload }) => {
  const downloadQR = () => {
    if (qrCode) {
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = `lifecode-qr-${userId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Your QR Code
      </h3>
      <div className="flex justify-center mb-4">
        {qrCode ? (
          <img
            src={qrCode}
            alt="QR Code"
            className="w-64 h-64 border-4 border-gray-200 rounded-lg"
          />
        ) : (
          <div className="w-64 h-64 border-4 border-gray-200 rounded-lg flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">Loading QR Code...</p>
          </div>
        )}
      </div>
      <div className="space-y-3">
        <button
          onClick={downloadQR}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
        >
          Download QR Code
        </button>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Profile URL:</p>
          <p className="text-xs text-gray-800 break-all font-mono">{profileUrl}</p>
        </div>
        <p className="text-sm text-center text-gray-600">
          Share this QR code or save it for emergency situations
        </p>
      </div>
    </div>
  );
};

export default QRCard;

