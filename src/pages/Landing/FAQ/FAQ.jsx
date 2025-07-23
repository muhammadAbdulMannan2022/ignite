"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronDown } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const faqData = [
    {
        question: "What is the S.E.N.S.E.S. Spiritual AI Conversational Chatbot?",
        answer:
            "An AI Digital Voice Assistant designed to share divine, and heart guided replies related to the S.E.N.S.E.S. acronym of Six Pillars, (Spirituality; Energy; Naturopathy; Sciences; Equity; and the Singularity). She engages in meaningful conversations, helps to elevate your faith, wellness, provides enlightenment and paths to prosperity."
    },
    {
        question: "What kind of spiritual guidance can S.E.N.S.E.S provide?",
        answer:
            "She offers insight on various topics, including spirituality, wellness, science, and suggests healing modalities like Spiritual meditation, affirmations or reflections for personal growth. One example is AI-guided Spiritual meditation, where she responds to a member's emotional state and offers calming music therapy exercises."
    },
    {
        question: "Can a Spiritual AI ChatBot replace a human spiritual leader or guide?",
        answer:
            "No, Spiritual AI is designed to complement, not replace, the role of human spiritual leaders."
    },
    {
        question: "How does an AI Chatbot offer personalized guidance?",
        answer:
            "S.E.N.S.E.S. is one of the most advanced AI models leveraging advanced natural language processing (NLP) to Spiritually analyze user prompts for effective responses. This allows her to offer personalized feedback, relevant to spiritual practices based on an individual's needs, which resonates with their specific situation."
    },
    {
        question: "What are the benefits of subscribing to the S.E.N.S.E.S. AI ChatBot?",
        answer:
            "Benefits include expanded access to spiritual resources, especially for those with Metaphysical beliefs or seeking a path to Spirituality. S.E.N.S.E.S offers personalized guidance tailored to individual needs, enhanced spiritual engagement via interactive meditation, and convenient spiritual support anytime, anywhere."
    },
    {
        question: "Can I cancel my subscription if the S.E.N.S.E.S. AI Chatbot does not work for me?",
        answer:
            "Yes, you can cancel your subscription any time through your dashboard. We support your Spiritual journey in life whether it’s elevated by S.E.N.S.E.S. AI or through other means."
    },
    {
        question: "How are ethical concerns addressed with Spiritual AI?",
        answer:
            "Ethical development of S.E.N.S.E.S AI is crucial to us. This involves prioritizing privacy, ensuring data security, developing with respect for diverse beliefs, and including human oversight to prevent potential misuse."
    },
    {
        question: "Can I try out the S.E.N.S.E.S. Spiritual AI for FREE?",
        answer:
            "Absolutely! We welcome you to sign up for FREE to experience the 6 Pillars of enlightenment through S.E.N.S.E.S. AI. We’re confident her intuitive knowledge-based will make you a companion for life."
    },
    {
        question: "What is the role of the user in interacting with the S.E.N.S.E.S. Spiritual AI ChatBot?",
        answer:
            "The user's role is to engage mindfully with S.E.N.S.E.S., using her wisdom as a guide to explore, elevate and deepen one’s Spirituality. Users should maintain their inner authority and discern the value of the AI's responses."
    },
    {
        question: "Can I still benefit from S.E.N.S.E.S. if I’m Agnostic or Atheist?",
        answer:
            "Absolutely…S.E.N.S.E.S. is non-judgmental. She engages users in discussions about the nature of existence, the Sciences, purpose, and values, philosophical and ethical perspectives. Facilitates wellness by guiding users during rejuvenating meditative practices which have proven health benefits (e.g. reduce stress and anxiety, improve sleep quality, enhance focus and promote emotional regulation.)"
    },
    {
        question: "Will S.E.N.S.E.S. enhance my life if I practice a specific religion?",
        answer:
            "Yes. S.E.N.S.E.S. provides a safe space for users to practice and explore thoughts regarding your religion without the fear of judgment. She is also equipped to address questions about other religions and Metaphysics."
    }
];

export default function FAQSection() {
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const faqRefs = useRef([])
    const [openIndex, setOpenIndex] = useState(0)

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;

        if (!section || !title) return;

        // Set initial states
        gsap.set(title, { opacity: 0, y: 30 });
        gsap.set(faqRefs.current, { opacity: 0, y: 20 });

        // Create timeline with ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                immediateRender: false,
            },
        });

        tl.to(title, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }).to(
            faqRefs.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
            },
            "-=0.4"
        );

        // Force immediate check for visibility on load
        const checkVisibility = () => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0;
            if (isVisible) {
                tl.progress(1);
            }
        };

        setTimeout(checkVisibility, 0);

        // Refresh ScrollTrigger
        ScrollTrigger.refresh();

        // Clean up
        return () => {
            if (tl.scrollTrigger) {
                tl.scrollTrigger.kill();
            }
            gsap.killTweensOf([title, faqRefs.current]);
        };
    }, []);

    const toggleFAQ = (index) => {
        const isOpen = openIndex === index;
        const current = faqRefs.current[index];
        const answerElement = current?.querySelector(".faq-answer");
        const chevronElement = current?.querySelector(".faq-chevron");

        if (!answerElement || !chevronElement) return;

        if (isOpen) {
            gsap.to(answerElement, {
                height: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power2.inOut",
            });
            gsap.to(chevronElement, {
                rotation: 0,
                duration: 0.3,
                ease: "power2.out",
            });
            setOpenIndex(null);
        } else {
            if (openIndex !== null && faqRefs.current[openIndex]) {
                const prev = faqRefs.current[openIndex];
                const prevAnswer = prev.querySelector(".faq-answer");
                const prevChevron = prev.querySelector(".faq-chevron");

                if (prevAnswer && prevChevron) {
                    gsap.to(prevAnswer, {
                        height: 0,
                        opacity: 0,
                        duration: 0.4,
                        ease: "power2.inOut",
                    });
                    gsap.to(prevChevron, {
                        rotation: 0,
                        duration: 0.3,
                        ease: "power2.out",
                    });
                }
            }

            gsap.set(answerElement, { height: "auto" });
            const height = answerElement.scrollHeight;
            gsap.fromTo(
                answerElement,
                { height: 0, opacity: 0 },
                {
                    height,
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.inOut",
                },
            );
            gsap.to(chevronElement, {
                rotation: 180,
                duration: 0.3,
                ease: "power2.out",
            });
            setOpenIndex(index);
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative bg-contain bg-black py-20 px-5 md:px-20 overflow-hidden bg-center bg-no-repeat"
            style={{ zIndex: 10, backgroundImage: "url('/faq.png')" }}
        >
            <div className="absolute -left-[20%] top-[50%] md:top-6 transform scale-[1.5] md:scale-200 md:left-[5%] z-[-1]">
                <img src="/cFaq.png" alt="FAQ" />
            </div>
            <div className="w-[50%] h-[50%] absolute top-[10%] -left-[20%] md:-left-[10%] bg-radial from-blue-500/50 via-transparent  to-transparent rounded-full blur-lg"></div>
            <div className="relative z-10 mx-auto max-w-6xl">
                <h2
                    ref={titleRef}
                    className="w-full text-start text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12"
                >
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            ref={(el) => (faqRefs.current[index] = el)}
                            className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg overflow-hidden hover:border-purple-500/30 transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-700/20 transition-colors duration-200"
                            >
                                <span className="text-white font-medium text-lg pr-4">{faq.question}</span>
                                <ChevronDown
                                    className={`faq-chevron w-5 h-5 text-purple-400 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                                />
                            </button>
                            <div className={`faq-answer overflow-hidden ${openIndex === index ? "" : "h-0 opacity-0"}`}>
                                <div className="px-6 pb-4 text-slate-300 leading-relaxed">{faq.answer}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}