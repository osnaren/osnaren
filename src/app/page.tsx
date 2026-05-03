'use client';

import ThreeBackground from '@/components/ThreeBackground';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden text-center">
      <ThreeBackground />

      <div className="z-10 mx-auto flex max-w-4xl flex-col items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-6"
        >
          <span className="bg-secondary/30 text-muted-foreground inline-block rounded-full border border-white/10 px-3 py-1 font-mono text-xs tracking-widest uppercase backdrop-blur-md">
            Portfolio v1.0
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="font-geist-sans mb-8 bg-linear-to-b from-white to-white/40 bg-clip-text text-5xl font-bold tracking-tighter text-transparent md:text-8xl"
        >
          Coming Soon
        </motion.h1>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="text-muted-foreground absolute bottom-8 text-xs"
      >
        © {new Date().getFullYear()} OSNaren. All rights reserved.
      </motion.footer>
    </main>
  );
}
