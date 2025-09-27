import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fashion Editor",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "The attention to detail and quality of craftsmanship is absolutely exceptional. Each piece feels like a work of art that happens to be wearable.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "I've been a client for three years now. The sustainable approach combined with timeless design makes this brand truly special.",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Entrepreneur",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      quote: "Every piece I own from this collection gets compliments. The quality is outstanding and the designs are perfectly balanced between classic and modern.",
      rating: 5
    }
  ];

  const pressLogos = [
    { name: "Vogue", logo: "VOGUE" },
    { name: "Harper's Bazaar", logo: "HARPER'S" },
    { name: "Elle", logo: "ELLE" },
    { name: "GQ", logo: "GQ" },
    { name: "Vanity Fair", logo: "VF" }
  ];

  const StarIcon = () => (
    <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the fashion-forward individuals 
            who make our designs part of their everyday elegance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              
              <blockquote className="font-sans text-gray-700 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <h3 className="font-serif text-2xl font-bold text-gray-900 mb-8">
            Featured In
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {pressLogos.map((press, index) => (
              <motion.div
                key={press.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="font-serif text-xl font-bold text-gray-900 hover:opacity-80 transition-opacity duration-300 cursor-pointer"
              >
                {press.logo}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;