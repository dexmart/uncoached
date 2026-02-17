import { useState, useEffect } from 'react';

const testimonials = [
    {
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        name: "Sarah T.",
        duration: "Registered Psychotherapist",
        quote: "Uncoached has become a steady place I return to between sessions. It supports reflection without directing the process."
    },
    {
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        name: "Alex M.",
        duration: "Leadership Coach",
        quote: "This is the first space where I did not feel pressure to optimize or fix myself. It helped me slow down and actually integrate what I was already learning."
    },
    {
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        name: "Maya R.",
        duration: "Somatic Practitioner",
        quote: "Uncoached respects the nervous system. The pacing, the language, the lack of agenda all matter. It feels supportive without being invasive."
    }
];

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleTouchStart = (e) => {
        setTouchStartX(e.changedTouches[0].screenX);
    };

    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length);
        } else if (touchEndX - touchStartX > 50) {
            setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "bg/S1 Hero Section.png"}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Centered Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <img
                    src={import.meta.env.BASE_URL + "logo/Uncoached Logo Primary Lora Font.png"}
                    alt="Uncoached Logo"
                    className="h-32 w-auto mb-16 mx-auto drop-shadow-md -translate-y-12"
                />
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-white drop-shadow-lg">
                    Where insight finally<br />becomes <span className="italic">lived.</span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                    A quiet, intelligent space for integrating what you already know into real life, real moments, and real change.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
                    <a
                        className="px-8 py-4 bg-sage text-bone rounded-full font-medium shadow-lg hover:bg-sage/90 hover:scale-105 transition-all duration-300 text-center"
                        href="#journey"
                    >
                        Start Your Journey
                    </a>
                    <a
                        className="px-8 py-4 bg-sage text-white rounded-full font-medium shadow-lg hover:bg-sage/90 hover:scale-105 transition-all duration-300 text-center"
                        href="#whats-inside"
                    >
                        What's Inside
                    </a>
                </div>

                <p className="text-white/70 text-sm italic drop-shadow">App coming soon.</p>
            </div>

            {/* Testimonial - Bottom Right */}
            <div
                className="absolute bottom-8 right-8 z-10 hidden md:block"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div className="bg-charcoal/80 backdrop-blur-md p-5 rounded-2xl max-w-xs shadow-2xl border border-bone/10">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="flex-shrink-0 w-full">
                                    <div className="flex flex-col items-center text-center">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full object-cover mb-3"
                                        />
                                        <p className="text-bone font-semibold text-sm">{testimonial.name}</p>
                                        <p className="text-golden-light text-xs mb-2">{testimonial.duration}</p>
                                        <div className="flex gap-0.5 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="text-golden-light text-xs">★</span>
                                            ))}
                                        </div>
                                        <p className="text-bone/80 text-xs leading-relaxed">
                                            "{testimonial.quote}"
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-1.5 mt-3">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentSlide ? 'bg-golden-light' : 'bg-bone/30 hover:bg-bone/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
