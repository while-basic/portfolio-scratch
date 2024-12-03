'use client';

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    // Increment count when component mounts
    fetch('/api/visitor-count', { method: 'POST' })
      .then(res => res.json())
      .then(data => setVisitorCount(data.count))
      .catch(error => console.error('Error updating visitor count:', error));
  }, []);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-2">Visitor Count</h2>
      <div className="flex items-center space-x-2">
        <span className="text-2xl">👥</span>
        <span className="text-xl font-medium">{visitorCount}</span>
        <span className="text-muted-foreground">total visits</span>
      </div>
    </Card>
  );
}
