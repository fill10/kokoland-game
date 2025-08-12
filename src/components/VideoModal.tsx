import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // اختيار فيديو عشوائي من القناة المحددة
  const videos = [
    'MBsYXRytFo8',
    'duD-rZAUeJE'
  ];
  const selectedVideo = videos[Math.floor(Math.random() * videos.length)];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-600 font-arabic">🎉 مبروك! أنت بطل! 🎉</h2>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 mb-4">
          <p className="text-center text-lg text-purple-700 font-arabic">
            ✨ لقد أكملت جميع المراحل بنجاح! استمتع بهذا الفيديو الجميل ✨
          </p>
        </div>

        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
            title="فيديو تحفيزي للأطفال"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;