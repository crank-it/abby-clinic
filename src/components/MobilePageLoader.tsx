'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  { quote: "Since using Abby, we've kept all of our key staff. Game changer!", author: "Practice Manager" },
  { quote: "Abby took 5 minutes to set up and saves us hours every day.", author: "Clinic Owner" },
  { quote: "Our no-show rate dropped 40% in the first month!", author: "Physio Clinic" },
  { quote: "I can't believe we ever did confirmations manually.", author: "Dental Practice" },
  { quote: "Abby pays for herself 10 times over. Best investment we made.", author: "Allied Health" },
  { quote: "Staff morale is up - no more tedious SMS checking!", author: "Multi-site Practice" },
  { quote: "Patients love the seamless experience. So do we!", author: "Wellness Centre" },
  { quote: "Setup was a breeze. Results were instant.", author: "Chiro Clinic" },
];

const pageRobots: Record<string, string> = {
  '/': '/new-server.png',
  '/how-it-works': '/abby-sends.png',
  '/pricing': '/hiw2.png',
  '/faq': '/interpritation.png',
  '/about': '/new-server.png',
  '/contact': '/new-server.png',
};

export function MobilePageLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [testimonial, setTestimonial] = useState(testimonials[0]);

  const prevPathnameRef = useRef(pathname);
  const isInitialMount = useRef(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Get robot image for current page
  const robotImage = pageRobots[pathname] || '/new-server.png';

  // Check if mobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Detect route changes - only after initial mount
  useEffect(() => {
    // Skip initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevPathnameRef.current = pathname;
      return;
    }

    // Only trigger on actual navigation, and only on mobile
    if (pathname !== prevPathnameRef.current && isMobile) {
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Pick a random testimonial
      setTestimonial(testimonials[Math.floor(Math.random() * testimonials.length)]);
      setIsLoading(true);
      prevPathnameRef.current = pathname;

      // Hide loader after 3700ms (doubled duration)
      timerRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 3700);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [pathname, isMobile]);

  // Safety: ensure loader never stays more than 4 seconds
  useEffect(() => {
    if (isLoading) {
      const safetyTimer = setTimeout(() => {
        setIsLoading(false);
      }, 4000);
      return () => clearTimeout(safetyTimer);
    }
  }, [isLoading]);

  // Don't render on desktop or during SSR
  if (typeof window === 'undefined' || !isMobile) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-white via-rose-50 to-pink-50"
        >
          {/* Animated background orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.3 }}
              transition={{ duration: 0.5 }}
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-red-200 to-pink-200 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-orange-200 to-red-200 rounded-full blur-3xl"
            />
          </div>

          {/* Content - shifted up to avoid home button area */}
          <div className="relative z-[110] flex flex-col items-center px-8 text-center -mt-24">
            {/* Robot with bounce animation */}
            <motion.div
              initial={{ y: 10, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20
              }}
              className="mb-4"
            >
              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Image
                  src={robotImage}
                  alt="Abby"
                  width={100}
                  height={100}
                  className="drop-shadow-lg"
                />
              </motion.div>
            </motion.div>

            {/* Loading dots */}
            <div className="flex gap-1.5 mb-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -6, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 0.35,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                  className="w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                />
              ))}
            </div>

            {/* Testimonial quote */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="max-w-xs"
            >
              <p className="text-gray-600 text-sm italic mb-1">
                "{testimonial.quote}"
              </p>
              <p className="text-red-500 text-xs font-medium">
                — {testimonial.author}
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
