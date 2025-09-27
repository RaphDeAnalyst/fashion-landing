import { motion } from 'framer-motion';

const About = () => {
  const keywords = [
    { word: 'Sustainable', description: 'Eco-friendly materials and ethical production' },
    { word: 'Handmade', description: 'Artisanal craftsmanship in every piece' },
    { word: 'Exclusive', description: 'Limited collections for discerning clients' },
    { word: 'Modern', description: 'Contemporary designs for today\'s lifestyle' }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Our Story
            </h2>
            
            <div className="space-y-4 font-sans text-gray-600 text-lg leading-relaxed">
              <p>
                Founded in the heart of Milan, our atelier represents the perfect fusion of 
                traditional craftsmanship and contemporary innovation. For over a decade, 
                we have been creating exceptional pieces that transcend fleeting trends.
              </p>
              
              <p>
                Each garment tells a story of meticulous attention to detail, sourced from 
                the finest materials and crafted by skilled artisans who share our passion 
                for excellence. We believe that true luxury lies not just in appearance, 
                but in the conscious choices we make for our planet and our community.
              </p>
              
              <p>
                Our commitment extends beyond fashion – we're building a sustainable future 
                where beauty, quality, and responsibility walk hand in hand.
              </p>
            </div>
            
            <motion.a 
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
            >
              Learn More About Us
            </motion.a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Designer at work in the atelier"
                className="w-full h-96 object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg max-w-xs">
              <p className="font-serif text-xl font-semibold text-gray-900 mb-2">
                "Fashion is art you can wear"
              </p>
              <p className="font-sans text-sm text-gray-600">
                - Elena Rossi, Creative Director
              </p>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
            What Sets Us Apart
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {keywords.map((item, index) => (
              <motion.div
                key={item.word}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-700 transition-colors duration-300">
                  <span className="text-white font-bold text-xl">
                    {item.word.charAt(0)}
                  </span>
                </div>
                <h4 className="font-serif text-xl font-semibold text-gray-900 mb-2">
                  {item.word}
                </h4>
                <p className="font-sans text-gray-600 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;