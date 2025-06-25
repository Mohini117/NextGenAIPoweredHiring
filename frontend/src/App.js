import React, { useState } from 'react';
import { User, GraduationCap, Briefcase, Brain, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

// API Configuration
const API_BASE_URL = 'http://127.0.0.1:8000'; // Adjust this to your FastAPI server URL

// API Service
class TeacherHiringAPI {
  static async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      throw new Error('Failed to connect to API');
    }
  }

  static async predictTeacher(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Prediction failed: ${error.message}`);
    }
  }
}

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center space-x-2">
    <Loader className="w-5 h-5 animate-spin text-blue-600" />
    <span className="text-gray-600">Processing your application...</span>
  </div>
);

// Success Component
const SuccessMessage = ({ result, onReset }) => (
  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
    <div className="flex items-center space-x-3 mb-4">
      <CheckCircle className="w-8 h-8 text-green-600" />
      <h3 className="text-xl font-bold text-gray-800">Evaluation Complete!</h3>
    </div>
    
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <pre className="text-sm text-gray-700 whitespace-pre-wrap">
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
    
    <button
      onClick={onReset}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
    >
      Evaluate Another Teacher
    </button>
  </div>
);

// Error Component
const ErrorMessage = ({ error, onRetry }) => (
  <div className="bg-red-50 p-6 rounded-xl border border-red-200">
    <div className="flex items-center space-x-3 mb-4">
      <AlertCircle className="w-8 h-8 text-red-600" />
      <h3 className="text-xl font-bold text-red-800">Oops! Something went wrong</h3>
    </div>
    
    <p className="text-red-700 mb-4">{error}</p>
    
    <button
      onClick={onRetry}
      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
    >
      Try Again
    </button>
  </div>
);

// Form Input Component
const FormInput = ({ icon: Icon, label, value, onChange, placeholder, multiline = false }) => (
  <div className="space-y-2">
    <label className="flex items-center space-x-2 font-semibold text-gray-700">
      <Icon className="w-5 h-5 text-blue-600" />
      <span>{label}</span>
    </label>
    
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none h-32"
        required
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
        required
      />
    )}
  </div>
);

// API Status Component
const APIStatus = ({ isHealthy, version }) => (
  <div className="flex items-center justify-center space-x-2 mb-6">
    <div className={`w-3 h-3 rounded-full ${isHealthy ? 'bg-green-500' : 'bg-red-500'}`} />
    <span className="text-sm text-gray-600">
      API Status: {isHealthy ? 'Connected' : 'Disconnected'}
      {version && ` (v${version})`}
    </span>
  </div>
);

// Main Application Component
const TeacherHiringApp = () => {
  const [formData, setFormData] = useState({
    job_post: '',
    qualification: '',
    expertise: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [apiHealth, setApiHealth] = useState({ isHealthy: false, version: null });

  // Check API health on component mount
  React.useEffect(() => {
    checkAPIHealth();
  }, []);

  const checkAPIHealth = async () => {
    try {
      const health = await TeacherHiringAPI.checkHealth();
      setApiHealth({
        isHealthy: health.status === 'OK' && health.model_loaded,
        version: health.version
      });
    } catch (error) {
      setApiHealth({ isHealthy: false, version: null });
    }
  };

  const handleSubmit = async () => {
    if (!formData.job_post.trim() || !formData.qualification.trim() || !formData.expertise.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const prediction = await TeacherHiringAPI.predictTeacher(formData);
      setResult(prediction);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ job_post: '', qualification: '', expertise: '' });
    setResult(null);
    setError(null);
  };

  const retrySubmission = () => {
    setError(null);
    handleSubmit();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-3 bg-blue-600 rounded-full">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NextGen Teacher Evaluation
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced AI-powered system to evaluate and predict teacher performance based on qualifications and expertise
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <APIStatus isHealthy={apiHealth.isHealthy} version={apiHealth.version} />
        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
              <Brain className="w-7 h-7" />
              <span>Teacher Evaluation Form</span>
            </h2>
            <p className="text-blue-100 mt-2">
              Fill in the details below to get an AI-powered evaluation
            </p>
          </div>

          {/* Form Body */}
          <div className="p-8">
            {!isLoading && !result && !error && (
              <div className="space-y-6">
                <FormInput
                  icon={Briefcase}
                  label="Job Position"
                  value={formData.job_post}
                  onChange={(value) => setFormData(prev => ({ ...prev, job_post: value }))}
                  placeholder="e.g., Mathematics Teacher, Science Teacher, English Literature Teacher..."
                />

                <FormInput
                  icon={GraduationCap}
                  label="Qualification"
                  value={formData.qualification}
                  onChange={(value) => setFormData(prev => ({ ...prev, qualification: value }))}
                  placeholder="e.g., Master's in Mathematics, B.Ed in Science, PhD in English Literature..."
                  multiline
                />

                <FormInput
                  icon={Brain}
                  label="Area of Expertise"
                  value={formData.expertise}
                  onChange={(value) => setFormData(prev => ({ ...prev, expertise: value }))}
                  placeholder="e.g., Advanced Calculus, Physics, Creative Writing, Special Education..."
                  multiline
                />

                <div className="pt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={!apiHealth.isHealthy}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 ${
                      apiHealth.isHealthy
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-6 h-6" />
                    <span>
                      {apiHealth.isHealthy ? 'Evaluate Teacher' : 'API Unavailable'}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="py-12">
                <LoadingSpinner />
              </div>
            )}

            {result && (
              <SuccessMessage result={result} onReset={resetForm} />
            )}

            {error && (
              <ErrorMessage error={error} onRetry={retrySubmission} />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>Powered by NextGen AI • Advanced Teacher Evaluation System</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherHiringApp;