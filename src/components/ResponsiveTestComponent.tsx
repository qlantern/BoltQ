import React, { useState } from 'react';
import useBreakpoint from '../hooks/useBreakpoint';
import ResponsiveGrid from './ResponsiveGrid';
import TouchButton from './TouchButton';
import ResponsiveModal from './ResponsiveModal';
import ResponsiveImage from './ResponsiveImage';

const ResponsiveTestComponent: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const breakpointInfo = useBreakpoint();

  return (
    <div className=\"p-4 max-w-7xl mx-auto\">
      <div className=\"bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8\">
        <h1 className=\"text-2xl font-bold mb-4 text-gray-900 dark:text-white\">
          BoltQ Responsive Design Test
        </h1>
        
        {/* Breakpoint Information */}
        <div className=\"bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6\">
          <h2 className=\"text-lg font-semibold mb-3 text-gray-900 dark:text-white\">
            Current Breakpoint Information
          </h2>
          <div className=\"grid grid-cols-2 md:grid-cols-4 gap-4 text-sm\">
            <div className=\"text-gray-700 dark:text-gray-300\">
              <strong>Width:</strong> {breakpointInfo.width}px
            </div>
            <div className=\"text-gray-700 dark:text-gray-300\">
              <strong>Current:</strong> {breakpointInfo.currentBreakpoint}
            </div>
            <div className=\"text-gray-700 dark:text-gray-300\">
              <strong>Mobile:</strong> {breakpointInfo.isMobile ? 'Yes' : 'No'}
            </div>
            <div className=\"text-gray-700 dark:text-gray-300\">
              <strong>Desktop:</strong> {breakpointInfo.isDesktop ? 'Yes' : 'No'}
            </div>
          </div>
        </div>

        {/* Touch Button Tests */}
        <div className=\"mb-8\">
          <h2 className=\"text-lg font-semibold mb-3 text-gray-900 dark:text-white\">
            Touch-Optimized Buttons
          </h2>
          <div className=\"flex flex-wrap gap-4\">
            <TouchButton variant=\"primary\" size=\"sm\">
              Small Button
            </TouchButton>
            <TouchButton variant=\"secondary\" size=\"md\">
              Medium Button
            </TouchButton>
            <TouchButton variant=\"outline\" size=\"lg\">
              Large Button
            </TouchButton>
            <TouchButton variant=\"ghost\" onClick={() => setShowModal(true)}>
              Open Modal
            </TouchButton>
          </div>
        </div>

        {/* Responsive Grid Test */}
        <div className=\"mb-8\">
          <h2 className=\"text-lg font-semibold mb-3 text-gray-900 dark:text-white\">
            Responsive Grid System
          </h2>
          <ResponsiveGrid
            cols={{
              mobile: 1,
              tablet: 2,
              desktop: 3,
              largeDesktop: 4
            }}
            gap=\"gap-4\"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <div key={num} className=\"bg-coral-100 dark:bg-coral-900 p-4 rounded-lg text-center\">
                <div className=\"text-coral-800 dark:text-coral-200 font-semibold\">
                  Grid Item {num}
                </div>
              </div>
            ))}
          </ResponsiveGrid>
        </div>

        {/* Responsive Images Test */}
        <div className=\"mb-8\">
          <h2 className=\"text-lg font-semibold mb-3 text-gray-900 dark:text-white\">
            Responsive Images
          </h2>
          <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4\">
            <ResponsiveImage
              src=\"https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg\"
              alt=\"Teacher example 1\"
              aspectRatio=\"16/9\"
              className=\"rounded-lg overflow-hidden\"
            />
            <ResponsiveImage
              src=\"https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg\"
              alt=\"Teacher example 2\"
              aspectRatio=\"4/3\"
              className=\"rounded-lg overflow-hidden\"
            />
            <ResponsiveImage
              src=\"https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg\"
              alt=\"Teacher example 3\"
              aspectRatio=\"1/1\"
              className=\"rounded-lg overflow-hidden\"
            />
          </div>
        </div>

        {/* Device-specific Features */}
        <div className=\"mb-8\">
          <h2 className=\"text-lg font-semibold mb-3 text-gray-900 dark:text-white\">
            Device-Specific Features
          </h2>
          <div className=\"space-y-4\">
            {breakpointInfo.isMobile && (
              <div className=\"bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4\">
                <p className=\"text-blue-800 dark:text-blue-200\">
                  \u2705 Mobile-specific features are active:
                </p>
                <ul className=\"list-disc list-inside mt-2 text-blue-700 dark:text-blue-300 text-sm\">
                  <li>Touch-optimized button sizes (min 44px)</li>
                  <li>Full-screen modals</li>
                  <li>Mobile navigation patterns</li>
                  <li>Single-column layouts</li>
                </ul>
              </div>
            )}
            
            {breakpointInfo.isTablet && (
              <div className=\"bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4\">
                <p className=\"text-green-800 dark:text-green-200\">
                  \u2705 Tablet-specific features are active:
                </p>
                <ul className=\"list-disc list-inside mt-2 text-green-700 dark:text-green-300 text-sm\">
                  <li>Hybrid desktop/mobile navigation</li>
                  <li>Two-column layouts</li>
                  <li>Medium-sized modals</li>
                  <li>Touch and hover interactions</li>
                </ul>
              </div>
            )}
            
            {breakpointInfo.isDesktop && (
              <div className=\"bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4\">
                <p className=\"text-purple-800 dark:text-purple-200\">
                  \u2705 Desktop-specific features are active:
                </p>
                <ul className=\"list-disc list-inside mt-2 text-purple-700 dark:text-purple-300 text-sm\">
                  <li>Hover interactions and overlays</li>
                  <li>Multi-column layouts</li>
                  <li>Sidebar navigation</li>
                  <li>Standard modal sizing</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Test Modal */}
      <ResponsiveModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title=\"Responsive Modal Test\"
      >
        <div className=\"space-y-4\">
          <p className=\"text-gray-700 dark:text-gray-300\">
            This modal automatically adapts to different screen sizes:
          </p>
          <ul className=\"list-disc list-inside text-gray-600 dark:text-gray-400 text-sm space-y-1\">
            <li>Mobile: Full-screen with fixed header</li>
            <li>Tablet & Desktop: Centered with max-width</li>
            <li>Touch-optimized close button</li>
            <li>Proper spacing and typography scaling</li>
          </ul>
          <div className=\"pt-4\">
            <TouchButton 
              variant=\"primary\" 
              onClick={() => setShowModal(false)}
              className=\"w-full sm:w-auto\"
            >
              Close Modal
            </TouchButton>
          </div>
        </div>
      </ResponsiveModal>
    </div>
  );
};

export default ResponsiveTestComponent;