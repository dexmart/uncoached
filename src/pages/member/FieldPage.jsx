import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const FieldPage = () => {
    const { user } = useAuth();
    const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'there';

    // Placeholder state for chat - will be replaced by external chatbot embed
    const [messages, setMessages] = useState([
        {
            role: 'field',
            content: `Hey ${displayName}. I'm glad you're here. What's on your mind?`
        }
    ]);
    const [inputValue, setInputValue] = useState('');

    // Placeholder handler - will be replaced by external chatbot
    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: inputValue }]);
        setInputValue('');

        // Placeholder response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'field',
                content: "I'm listening. Tell me more about that."
            }]);
        }, 1000);
    };

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
                <header className="flex items-center justify-between px-6 py-4">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 text-[#3F5D4D] bg-[#F4F1EC]/85 backdrop-blur-md px-5 py-2.5 rounded-full hover:bg-white hover:text-[#1F2422] transition-colors shadow-sm border border-white/40 group mix-blend-normal"
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

                    <div className="w-24"></div> {/* Spacer for centering */}
                </header>

                {/* Chat Container */}
                <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 pb-6">
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto py-6 space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {message.role === 'field' && (
                                    <div className="flex-shrink-0 mr-3">
                                        <div className="w-10 h-10 rounded-full bg-sage/30 backdrop-blur-sm flex items-center justify-center">
                                            <img
                                                src={import.meta.env.BASE_URL + "images/Field Icons/field chat.png"}
                                                alt="Field"
                                                className="w-6 h-6"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] px-5 py-4 rounded-2xl ${message.role === 'user'
                                        ? 'bg-sage text-bone rounded-br-md'
                                        : 'bg-white/90 backdrop-blur-sm text-text-dark rounded-bl-md'
                                        }`}
                                >
                                    <p className="text-[15px] leading-relaxed">{message.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="relative">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-clay/20 overflow-hidden">
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend(e);
                                    }
                                }}
                                placeholder="Type your message..."
                                className="w-full px-5 py-4 pr-14 bg-transparent resize-none focus:outline-none text-text-dark placeholder-text-muted"
                                rows={1}
                            />
                            <button
                                type="submit"
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-sage hover:bg-sage/90 rounded-full flex items-center justify-center transition-colors"
                                aria-label="Send message"
                            >
                                <svg className="w-5 h-5 text-bone" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-bone/60 text-xs text-center mt-3">
                            Field is here to support you. This is a safe space.
                        </p>
                    </form>
                </div>
            </div>

            {/* 
                EXTERNAL CHATBOT INTEGRATION PLACEHOLDER
                =========================================
                The client will provide their external chatbot embed code.
                Replace the chat UI above with the embedded chatbot widget.
                
                Options:
                1. iframe embed
                2. Script tag embed
                3. API integration
            */}
        </div>
    );
};

export default FieldPage;
