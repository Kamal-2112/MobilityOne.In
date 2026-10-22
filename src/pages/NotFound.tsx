import { Plus } from 'lucide-react';
import Navbar, { navigate } from '@/components/Navbar';
import { updateDocumentMeta, SITE_URL } from '@/utils/seo';
import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    updateDocumentMeta({
      title: 'Page Not Found — OrthoCare',
      description: 'The page you are looking for could not be found. Browse our prosthetics and orthotics catalog instead.',
      canonicalPath: '/404',
    });
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="relative inline-flex items-center justify-center rounded-full bg-pink mb-8" style={{ width: 80, height: 80 }}>
          <Plus className="text-primary" strokeWidth={3} style={{ width: 40, height: 40 }} />
        </div>
        <h1 className="text-4xl font-extrabold text-navy mb-3">404 — Page Not Found</h1>
        <p className="text-navy/50 mb-8 text-center max-w-md">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/')}
            className="px-7 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export { SITE_URL };
