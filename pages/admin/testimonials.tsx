import React, { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/admin/protected-route';
import { Star, Plus, Edit, Trash2, ExternalLink, Loader2 } from 'lucide-react';
import { testimonialService, type Testimonial } from '@/lib/services/testimonials';
import { useToast } from "@/components/ui/use-toast";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await testimonialService.getAll();
      setTestimonials(data);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to load testimonials',
        description: error instanceof Error ? error.message : 'An unknown error occurred'
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      await testimonialService.delete(id);
      setTestimonials(testimonials.filter(t => t.id !== id));
      toast.success('Testimonial deleted successfully');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to delete testimonial',
        description: error instanceof Error ? error.message : 'An unknown error occurred'
      });
      console.error(error);
    }
  };

  const handleToggleFeatured = async (id: number, featured: boolean) => {
    try {
      await testimonialService.toggleFeatured(id, !featured);
      setTestimonials(testimonials.map(t => 
        t.id === id ? { ...t, featured: !featured } : t
      ));
      toast.success(`Testimonial ${!featured ? 'featured' : 'unfeatured'} successfully`);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to update testimonial',
        description: error instanceof Error ? error.message : 'An unknown error occurred'
      });
      console.error(error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Star className="w-6 h-6 mr-2" />
            <h1 className="text-2xl font-bold">Testimonials</h1>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonial
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No testimonials found</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center mx-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Testimonial
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {testimonial.image ? (
                          <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl font-semibold text-gray-600">{testimonial.name[0]}</span>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                        <p className="text-sm text-gray-500">{testimonial.company}</p>
                      </div>
                    </div>
                    {testimonial.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{testimonial.content}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="text-sm text-gray-500">
                      Added: {testimonial.date}
                    </div>
                    <div className="flex space-x-2">
                      {testimonial.linkedIn && (
                        <a
                          href={testimonial.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button 
                        onClick={() => handleToggleFeatured(testimonial.id, testimonial.featured)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {testimonial.featured ? (
                          <span>Unfeature</span>
                        ) : (
                          <span>Feature</span>
                        )}
                      </button>
                      <button 
                        onClick={() => handleDelete(testimonial.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Testimonials;
