const ProfileCard = ({ user }) => {
  if (!user) {
    return (
      <div className="bg-white rounded-xl shadow-xl p-8 text-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
          <span className="text-white text-3xl font-bold">
            {user.name?.charAt(0).toUpperCase() || '?'}
          </span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-600 mt-2">Age: {user.age} years</p>
      </div>

      <div className="space-y-6">
        {/* Blood Group */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <h3 className="font-semibold text-red-800 mb-2">Blood Group</h3>
          <p className="text-2xl font-bold text-red-600">{user.bloodGroup}</p>
        </div>

        {/* Emergency Contact */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">Emergency Contact</h3>
          <p className="text-lg text-gray-800">
            <strong>Name:</strong> {user.emergencyContact?.name}
          </p>
          <p className="text-lg text-gray-800">
            <strong>Phone:</strong>{' '}
            <a
              href={`tel:${user.emergencyContact?.phone}`}
              className="text-blue-600 hover:underline"
            >
              {user.emergencyContact?.phone}
            </a>
          </p>
          {user.emergencyContact?.relationship && (
            <p className="text-lg text-gray-800">
              <strong>Relationship:</strong> {user.emergencyContact.relationship}
            </p>
          )}
        </div>

        {/* Allergies */}
        {user.allergies && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <h3 className="font-semibold text-yellow-800 mb-2">Allergies</h3>
            <p className="text-gray-800">{user.allergies}</p>
          </div>
        )}

        {/* Medical History */}
        {user.medicalHistory && (
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
            <h3 className="font-semibold text-purple-800 mb-2">Medical History</h3>
            <p className="text-gray-800 whitespace-pre-wrap">{user.medicalHistory}</p>
          </div>
        )}

        {/* Address */}
        {user.address && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <h3 className="font-semibold text-green-800 mb-2">Address</h3>
            <p className="text-gray-800">{user.address}</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          This is an emergency profile. If you found this person, please contact their emergency contact immediately.
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;

