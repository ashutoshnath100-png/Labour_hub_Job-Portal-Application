import { Search, HelpCircle, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import ChatBot from "../components/ChatBot";
import { useState } from "react";

const HelpCenter = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const query = searchQuery.toLowerCase();

    const cards = [
        {
            id: "call",
            title: "Call Us",
            keywords: ["call", "phone", "contact"],
            icon: <Phone className="text-orange-500" />,
            subtitle: "Mon–Sat, 9AM–6PM",
            value: "+91 9431607346",
            action: () => window.open("tel:+919431607346"),
        },
        {
            id: "email",
            title: "Email Us",
            keywords: ["email", "mail", "support"],
            icon: <Mail className="text-orange-500" />,
            subtitle: "We reply within 24 hrs",
            value: "support@Urban Force.com",
            action: () => window.open("mailto:support@Urban Force.com"),
        },
        {
            id: "whatsapp",
            title: "WhatsApp",
            keywords: ["whatsapp", "chat", "message"],
            icon: <MessageCircle className="text-orange-500" />,
            subtitle: "Quick responses",
            value: "Chat Now",
            action: () => window.open("https://wa.me/919431607346"),
        },
    ];

    const filteredCards = cards.filter(card =>
        card.keywords.some(k => k.includes(query))
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fdf4ec] via-[#f8f9fb] to-[#eaf2ff]">


            <section className="py-20">
                <div className="max-w-5xl mx-auto px-4 text-center">

                    <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto mb-6">
                        <HelpCircle className="w-8 h-8 text-orange-500" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Help Center
                    </h1>

                    <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
                        Find answers to common questions or get in touch with our support team
                    </p>

                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for help..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-14 pl-12 pr-4 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto mb-24 px-4">
                {(query ? filteredCards : cards).map((card) => (
                    <div
                        key={card.id}
                        onClick={card.action}
                        className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition text-center cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                            {card.icon}
                        </div>
                        <h2 className="font-semibold text-lg mb-1">{card.title}</h2>
                        <p className="text-gray-500 text-sm">{card.subtitle}</p>
                        <p className="font-semibold mt-3 text-orange-500">{card.value}</p>
                    </div>
                ))}
            </section>


            <section className="max-w-6xl mx-auto px-4 mb-24">
                <div className="bg-white rounded-2xl shadow border overflow-hidden">

                    <div className="flex items-center gap-3 px-6 py-4 border-b">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                            <MapPin className="text-orange-500" />
                        </div>
                        <h2 className="text-lg font-semibold">Our Location</h2>
                    </div>

                    <div className="w-full h-[420px]">
                        <iframe
                            title="Urban Force Location"
                            src="https://www.google.com/maps?q=National+Institute+of+Technology+Patna&output=embed"
                            className="w-full h-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    <div className="px-6 py-4 flex items-start gap-3 bg-gray-50">
                        <MapPin className="text-orange-500 mt-1" />
                        <div>
                            <p className="font-semibold">Urban Force Office</p>
                            <p className="text-sm text-gray-500">
                                Gaur City Center, Greater Noida, UP, IN
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            <ChatBot />
        </div>
    );
};

export default HelpCenter;