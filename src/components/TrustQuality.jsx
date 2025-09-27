import { motion } from 'framer-motion';

const TrustQuality = () => {
  const qualities = [
    {
      icon: "💎",
      title: "Premium Fabrics",
      description: "Sourced from the finest mills in Italy and France, our fabrics represent the pinnacle of luxury textile craftsmanship.",
      features: ["100% Natural Fibers", "Sustainable Sourcing", "Italian & French Mills"]
    },
    {
      icon: "✂️",
      title: "Custom Fit",
      description: "Every piece is tailored to perfection with our comprehensive fitting process, ensuring unparalleled comfort and style.",
      features: ["Personal Consultations", "3D Body Scanning", "Multiple Fittings"]
    },
    {
      icon: "🌱",
      title: "Ethical Production",
      description: "We work exclusively with certified artisans and workshops that share our commitment to fair labor and environmental responsibility.",
      features: ["Fair Trade Certified", "Carbon Neutral", "Local Artisans"]
    },
    {
      icon: "🏆",
      title: "Lifetime Quality",
      description: "Each garment comes with our lifetime quality guarantee, including complimentary alterations and repair services.",
      features: ["Lifetime Warranty", "Free Alterations", "Repair Services"]
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Uncompromising Quality
          </h2>
          <p className="font-sans text-lg text-gray-300 max-w-3xl mx-auto">
            Behind every piece lies a commitment to excellence that goes beyond aesthetics. 
            Discover what makes our fashion truly exceptional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {qualities.map((quality, index) => (
            <motion.div
              key={quality.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors duration-300">
                <span className="text-3xl">{quality.icon}</span>
              </div>
              
              <h3 className="font-serif text-xl font-semibold mb-4">
                {quality.title}
              </h3>
              
              <p className="font-sans text-gray-300 text-sm mb-6 leading-relaxed">
                {quality.description}
              </p>
              
              <div className="space-y-2">
                {quality.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (index * 0.1) + (featureIndex * 0.05) }}
                    className="flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center bg-white/5 rounded-lg p-8"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="font-serif text-2xl font-bold mb-6">
              Our Commitment to Excellence
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-300 mb-2">15+</div>
                <div className="text-sm text-gray-300">Years of Experience</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-primary-300 mb-2">5000+</div>
                <div className="text-sm text-gray-300">Satisfied Clients</div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-primary-300 mb-2">98%</div>
                <div className="text-sm text-gray-300">Client Retention Rate</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
            Learn About Our Process
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustQuality;