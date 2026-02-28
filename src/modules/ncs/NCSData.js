/**
 * Raw data definitions for the NCS Module (Videos, Quiz Questions)
 */

export const NCSData = {
    VIDEOS: [
        {
            title: "📍 Median Motor Study",
            description: "Median motor nerve conduction technique for carpal tunnel evaluation",
            recording: "Thenar muscles (APB)",
            stimulation: "Wrist & elbow",
            videoUrl: "https://www.youtube.com/embed/cdVrcgeBgIg"
        },
        {
            title: "📍 Median Sensory Study",
            description: "Median sensory nerve conduction study - digit 3 to wrist",
            recording: "Digit 3 to wrist",
            stimulation: "Orthodromic stimulation",
            videoUrl: "https://www.youtube.com/embed/86j7cNLIX0U"
        },
        {
            title: "📍 Ulnar Motor Study",
            description: "Ulnar motor nerve conduction technique with across-elbow segment",
            recording: "Hypothenar muscles (ADM)",
            stimulation: "Wrist, below & above elbow",
            videoUrl: "https://www.youtube.com/embed/UmFYJDMucOY"
        },
        {
            title: "📍 Ulnar Sensory Study",
            description: "Ulnar sensory nerve conduction study - digit 5 to wrist",
            recording: "Digit 5 to wrist",
            stimulation: "Orthodromic stimulation",
            videoUrl: "https://www.youtube.com/embed/i9Naurf0eWU"
        },
        {
            title: "📍 Dorsal Ulnar Cutaneous Study",
            description: "DUC study for differentiating ulnar neuropathy location",
            recording: "Dorsal hand to forearm",
            stimulation: "Antidromic stimulation",
            videoUrl: "https://www.youtube.com/embed/U-60ft_8klI"
        },
        {
            title: "📍 Radial Sensory Study",
            description: "Superficial radial sensory nerve conduction study",
            recording: "Dorsal web space to forearm",
            stimulation: "Antidromic stimulation",
            videoUrl: "https://www.youtube.com/embed/nMaxrbpyR-0"
        },
        {
            title: "📍 Common Fibular Motor Study",
            description: "Common fibular (peroneal) motor nerve conduction for drop foot evaluation",
            recording: "Extensor digitorum brevis (EDB)",
            stimulation: "Ankle, fibular head & popliteal fossa",
            videoUrl: "https://www.youtube.com/embed/G1bsDinxuF8"
        },
        {
            title: "📍 Superficial Fibular Study",
            description: "Superficial fibular sensory nerve conduction study",
            recording: "Lateral foot to leg",
            stimulation: "Antidromic stimulation",
            videoUrl: "https://www.youtube.com/embed/M1sE2FT8YQg"
        },
        {
            title: "📍 Tibial Motor Study",
            description: "Tibial motor nerve conduction technique",
            recording: "Abductor hallucis (AH)",
            stimulation: "Ankle, popliteal fossa",
            videoUrl: "https://www.youtube.com/embed/pWeH6kCa9lo"
        },
        {
            title: "📍 Sural Sensory Study",
            description: "Sural sensory nerve conduction - important for polyneuropathy screening",
            recording: "Lateral foot to calf",
            stimulation: "Antidromic stimulation",
            videoUrl: "https://www.youtube.com/embed/zP1yAU5DW2s"
        }
    ],

    LANDMARK_QUESTIONS: [
        {
            id: 1,
            difficulty: 'pgy2',
            nerve: 'median',
            question: "Where should the G1 (active) electrode be placed for median nerve motor studies?",
            options: [
                "Over the thenar eminence",
                "Over the belly of abductor pollicis brevis muscle",
                "Over the first metacarpal-phalangeal joint",
                "Over the palmaris longus tendon"
            ],
            correct: 1,
            explanation: "G1 should be placed over the belly of the abductor pollicis brevis muscle, not over tendon. This ensures proper muscle response recording."
        },
        {
            id: 2,
            difficulty: 'pgy2',
            nerve: 'median',
            question: "What is the standard distance from the wrist stimulation site to the recording electrode for median nerve studies?",
            options: ["6 cm", "8 cm", "10 cm", "12 cm"],
            correct: 1,
            explanation: "8 cm is the standard distance from wrist stimulation to recording electrode, ensuring accurate distal latency measurement."
        },
        {
            id: 3,
            difficulty: 'pgy2',
            nerve: 'ulnar',
            question: "Where is the G1 (active) electrode placed for ulnar nerve motor studies?",
            options: [
                "Over the fifth metacarpal",
                "Over the hypothenar eminence",
                "Over the belly of abductor digiti minimi muscle",
                "Over the flexor carpi ulnaris tendon"
            ],
            correct: 2,
            explanation: "G1 is placed over the belly of the abductor digiti minimi muscle in the medial hypothenar eminence for optimal recording."
        },
        {
            id: 4,
            difficulty: 'pgy3',
            nerve: 'ulnar',
            question: "For ulnar nerve across-elbow studies, where should the below-elbow stimulation site be placed?",
            options: [
                "At the medial epicondyle",
                "1 cm distal to medial epicondyle",
                "3 cm distal to medial epicondyle",
                "5 cm distal to medial epicondyle"
            ],
            correct: 2,
            explanation: "3 cm distal to the medial epicondyle ensures the stimulation is distal to the cubital tunnel, allowing detection of ulnar slowing at the elbow."
        },
        {
            id: 5,
            difficulty: 'pgy3',
            nerve: 'median',
            question: "What anatomical landmark guides median nerve stimulation at the antecubital fossa?",
            options: [
                "Biceps brachii tendon laterally",
                "Brachial artery pulsation medially",
                "Just medial to brachial artery pulsation",
                "Medial epicondyle"
            ],
            correct: 2,
            explanation: "Stimulation should be just medial to the brachial artery pulsation, between the medial edge of biceps tendon and the artery."
        },
        {
            id: 6,
            difficulty: 'pgy4',
            nerve: 'ulnar',
            question: "When performing ulnar studies across the elbow, what elbow position prevents factitious slowing?",
            options: [
                "Full extension (180°)",
                "90° flexion",
                "90°-135° flexion",
                "Maximum flexion"
            ],
            correct: 2,
            explanation: "Elbow flexion between 90°-135° prevents factitious slowing that can occur with extreme positions, ensuring accurate measurement."
        },
        {
            id: 7,
            difficulty: 'pgy4',
            nerve: 'median',
            question: "What potential pitfall should be considered when stimulating the median nerve at the antecubital fossa?",
            options: [
                "Radial nerve co-stimulation",
                "Martin-Gruber anastomosis",
                "Ulnar nerve co-stimulation",
                "Brachial plexus stimulation"
            ],
            correct: 1,
            explanation: "Martin-Gruber anastomosis (median-to-ulnar crossover in the forearm) can affect median nerve studies and must be considered."
        }
    ]
};
