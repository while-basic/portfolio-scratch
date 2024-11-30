'use client';

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import dynamic from 'next/dynamic';

// Dynamically import react-confetti to avoid SSR issues
const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false
});

export default function AudioRecorderPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [showDialog, setShowDialog] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-4">
              🎉 Congratulations! 🎉
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              You&apos;ve discovered the secret audio recorder page! 
            </p>
            <Button onClick={() => setShowDialog(false)}>
              Let&apos;s Begin!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Card className="p-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Audio Recorder</h1>
          <p className="text-muted-foreground">
            This is a hidden page where you can record and play audio.
          </p>
          {/* Audio recorder component will go here */}
        </div>
      </Card>
    </div>
  );
}
