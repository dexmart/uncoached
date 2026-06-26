import { Link } from 'react-router-dom';

// ChatBase agent that powers Field. Embedded as an iframe widget.
const CHATBASE_AGENT_ID = 'ZQ2IY-75iqOVAi4nuCUFU';
const CHATBASE_IFRAME_SRC = `https://www.chatbase.co/chatbot-iframe/${CHATBASE_AGENT_ID}`;

const FieldPage = () => {
    return (
        <div className="min-h-screen relative">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <img
                    src={import.meta.env.BASE_URL + "images/Membership/Members Field.jpg"}
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-charcoal/30"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-between px-4 sm:px-6 py-4">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 text-[#3F5D4D] bg-[#F4F1EC]/85 backdrop-blur-md px-5 py-2.5 rounded-full hover:bg-white hover:text-[#1F2422] transition-colors shadow-sm border border-white/40 group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm font-medium tracking-wide">Back to Portal</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <img
                            src={import.meta.env.BASE_URL + "images/Field Icons/field chat.png"}
                            alt="Field"
                            className="w-8 h-8"
                        />
                        <span className="text-bone font-display text-lg">Field</span>
                    </div>

                    <div className="w-10 sm:w-24" aria-hidden="true" />
                </header>

                {/* Intro */}
                <div className="text-center px-6 pt-4 pb-6">
                    <h1 className="font-display text-3xl md:text-4xl text-bone mb-2 drop-shadow">
                        You're here. Take your time.
                    </h1>
                    <p className="text-bone/80 text-sm md:text-base">
                        Field is listening. There's no right way to start.
                    </p>
                </div>

                {/* Chat Container — ChatBase embed */}
                <div className="flex-1 flex flex-col w-full max-w-3xl mx-auto px-4 pb-6">
                    <div className="flex-1 min-h-[60vh] bg-white/90 backdrop-blur-sm rounded-2xl border border-clay/20 overflow-hidden shadow-lg">
                        <iframe
                            title="Field"
                            src={CHATBASE_IFRAME_SRC}
                            className="w-full h-full min-h-[60vh]"
                            frameBorder="0"
                            allow="clipboard-write; microphone"
                        />
                    </div>
                    <p className="text-bone/70 text-xs text-center mt-4">
                        You can come back whenever you're ready.
                    </p>
                    <p className="text-bone/60 text-xs text-center italic mt-2">
                        Field is an AI-powered companion designed to support self-led reflection, not
                        replace human care.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FieldPage;
