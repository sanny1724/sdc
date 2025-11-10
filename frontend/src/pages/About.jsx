const About = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Life Code
          </h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Mission</h2>
              <p className="text-lg leading-relaxed">
                Life Code is an Emergency QR Identification System designed to save lives by making critical medical 
                information instantly accessible in emergency situations. When every second counts, first responders 
                and medical personnel need immediate access to vital information like blood type, allergies, and 
                emergency contacts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">How It Works</h2>
              <p className="text-lg leading-relaxed mb-4">
                Users register their emergency information through our secure platform. The system generates a 
                unique QR code that links to their emergency profile. This QR code can be printed, saved on a 
                phone, or placed on medical ID cards, wallets, or bracelets.
              </p>
              <p className="text-lg leading-relaxed">
                In an emergency, anyone with a smartphone can scan the QR code to instantly access critical 
                information, enabling faster and more informed medical care.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Key Features</h2>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Quick and easy registration process</li>
                <li>Instant QR code generation</li>
                <li>Secure storage of emergency information</li>
                <li>Public profile accessible via QR scan</li>
                <li>Easy profile updates and management</li>
                <li>Works offline - QR code contains direct link</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Privacy & Security</h2>
              <p className="text-lg leading-relaxed">
                We take your privacy seriously. Only essential emergency information is displayed on the public 
                profile. You have full control over your data and can update or delete your profile at any time 
                through the dashboard.
              </p>
            </section>

            <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-blue-600">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Developer</h2>
              <p className="text-lg">
                <strong>Project:</strong> Life Code - Emergency QR Identification System
              </p>
              <p className="text-lg mt-2">
                <strong>Technology Stack:</strong> MERN (MongoDB, Express.js, React, Node.js)
              </p>
              <p className="text-lg mt-2">
                <strong>Built with:</strong> React, Tailwind CSS, Express.js, MongoDB, QR Code Generation
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Get Started</h2>
              <p className="text-lg leading-relaxed">
                Ready to create your emergency profile? Click the Register button in the navigation menu to get 
                started. It only takes a few minutes, and it could save your life.
              </p>
            </section>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-blue-100 px-6 py-3 rounded-lg">
              <p className="text-blue-800 font-semibold">
                💡 Remember: Keep your QR code accessible and visible in case of emergencies
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

