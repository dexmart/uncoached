const SubscribeSection = () => {
    return (
        <section className="py-40 lg:py-60 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img src={import.meta.env.BASE_URL + "bg/S8 - Subscribe.png"} alt="" className="w-full h-full object-cover object-bottom" />
                <div className="absolute inset-0 bg-charcoal/70"></div>
            </div>

            <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
                <h2 className="font-display text-3xl md:text-4xl mb-4 text-bone italic">
                    Quiet insights, once a week.
                </h2>
                <p className="text-bone/80 mb-8 max-w-xl mx-auto">
                    Sign up to receive gentle reflections and calming strategies — no spam, just a peaceful pause in your inbox.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 w-full bg-bone/10 border border-bone/30 rounded-lg py-3 px-4 text-sm text-bone placeholder-bone/50 focus:ring-2 focus:ring-sage focus:border-sage outline-none transition-all backdrop-blur-sm"
                    />
                    <button className="w-full sm:w-auto px-8 py-3 bg-sage text-bone rounded-lg font-medium hover:bg-sage/90 transition-all duration-300">
                        Join the List
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SubscribeSection;
