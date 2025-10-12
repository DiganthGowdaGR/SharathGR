'use client';

import { useState } from 'react';
import Threads from '../../components/ui/ProfileCard';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);

    const toggleProfileCard = () => {
        setIsProfileCardOpen(!isProfileCardOpen);
    };

    return (
        <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 relative ">
            <div className="min-h-screen w-full bg-black relative">
                {/* Midnight Mist */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `
              radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 60%),
              radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
              radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)
            `,
                    }}
                />
                <div className="absolute top-4 right-4 z-10">
                    <button onClick={toggleProfileCard} className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </button>
                </div>

                {isProfileCardOpen && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-md">
                        <div className="w-3/4 h-3/4 relative">
                            <button onClick={toggleProfileCard} className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                            <Threads
                                amplitude={1}
                                distance={0}
                                enableMouseInteraction={true}
                            />
                        </div>
                    </div>
                )}

                {children}
                {/* Your Content/Components */}
            </div>
        </div>
    );
}
