// ==================== NAP MUSIQUE - APPRENDRE LE PIANO ====================

// ==================== AUDIO ====================
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = null;
let currentPianoStyle = 'classic'; // classic, electric, synth, organ
const PIANO_STYLE_KEY = 'napMusique_pianoStyle';

const NOTE_FREQUENCIES = {
    'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81,
    'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00,
    'A#3': 233.08, 'B3': 246.94,
    'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
    'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
    'A#4': 466.16, 'B4': 493.88,
    'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25,
    'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00,
    'A#5': 932.33, 'B5': 987.77,
    'C6': 1046.50, 'C#6': 1108.73, 'D6': 1174.66, 'D#6': 1244.51, 'E6': 1318.51
};

const NOTE_NAMES_FR = {
    'C': 'DO', 'C#': 'DO#', 'D': 'RÉ', 'D#': 'RÉ#', 'E': 'MI',
    'F': 'FA', 'F#': 'FA#', 'G': 'SOL', 'G#': 'SOL#', 'A': 'LA',
    'A#': 'LA#', 'B': 'SI'
};

// ==================== DONNÉES DES MORCEAUX ====================
const songsData = {
    1: [
        {
            id: 1, title: "Au Clair de la Lune", composer: "Traditionnel",
            notes: ['C4', 'C4', 'C4', 'D4', 'E4', 'D4', 'C4', 'E4', 'D4', 'D4', 'C4',
                    'C4', 'C4', 'C4', 'D4', 'E4', 'D4', 'C4', 'E4', 'D4', 'D4', 'C4',
                    'D4', 'D4', 'D4', 'E4', 'F4', 'E4', 'D4', 'C4', 'D4', 'E4', 'D4',
                    'C4', 'C4', 'C4', 'D4', 'E4', 'D4', 'C4', 'E4', 'D4', 'D4', 'C4',
                    'E4', 'E4', 'E4', 'F4', 'G4', 'F4', 'E4', 'D4', 'C4', 'D4', 'E4',
                    'C4', 'C4', 'C4', 'D4', 'E4', 'D4', 'C4', 'E4', 'D4', 'D4', 'C4',
                    'G4', 'G4', 'F4', 'E4', 'D4', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4',
                    'C4', 'C4', 'C4', 'D4', 'E4', 'D4', 'C4', 'E4', 'D4', 'D4', 'C4',
                    'A4', 'G4', 'F4', 'E4', 'D4', 'C4', 'D4', 'E4', 'D4', 'C4', 'B3',
                    'C4', 'C4', 'C4', 'D4', 'E4', 'D4', 'C4', 'E4', 'D4', 'D4', 'C4']
        },
        {
            id: 2, title: "Frère Jacques", composer: "Traditionnel",
            notes: ['C4', 'D4', 'E4', 'C4', 'C4', 'D4', 'E4', 'C4',
                    'E4', 'F4', 'G4', 'E4', 'F4', 'G4',
                    'G4', 'A4', 'G4', 'F4', 'E4', 'C4', 'G4', 'A4', 'G4', 'F4', 'E4', 'C4',
                    'C4', 'G3', 'C4', 'C4', 'G3', 'C4',
                    'C4', 'D4', 'E4', 'C4', 'C4', 'D4', 'E4', 'C4',
                    'E4', 'F4', 'G4', 'E4', 'F4', 'G4',
                    'G4', 'A4', 'G4', 'F4', 'E4', 'C4', 'G4', 'A4', 'G4', 'F4', 'E4', 'C4',
                    'D4', 'E4', 'F4', 'D4', 'D4', 'E4', 'F4', 'D4',
                    'F4', 'G4', 'A4', 'F4', 'G4', 'A4',
                    'A4', 'B4', 'A4', 'G4', 'F4', 'D4', 'A4', 'B4', 'A4', 'G4', 'F4', 'D4',
                    'C4', 'G3', 'C4', 'C4', 'G3', 'C4',
                    'E4', 'F4', 'G4', 'E4', 'F4', 'G4',
                    'G4', 'A4', 'G4', 'F4', 'E4', 'C4', 'G4', 'A4', 'G4', 'F4', 'E4', 'C4']
        },
        {
            id: 3, title: "Twinkle Twinkle", composer: "Mozart",
            notes: ['C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4',
                    'F4', 'F4', 'E4', 'E4', 'D4', 'D4', 'C4',
                    'G4', 'G4', 'F4', 'F4', 'E4', 'E4', 'D4',
                    'G4', 'G4', 'F4', 'F4', 'E4', 'E4', 'D4',
                    'C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4',
                    'F4', 'F4', 'E4', 'E4', 'D4', 'D4', 'C4',
                    'C5', 'C5', 'B4', 'B4', 'A4', 'A4', 'G4',
                    'F4', 'F4', 'E4', 'E4', 'D4', 'D4', 'C4',
                    'G4', 'G4', 'F4', 'F4', 'E4', 'E4', 'D4',
                    'G4', 'G4', 'F4', 'F4', 'E4', 'E4', 'D4',
                    'C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4',
                    'F4', 'F4', 'E4', 'E4', 'D4', 'D4', 'C4',
                    'E4', 'E4', 'D4', 'D4', 'C4', 'C4', 'B3',
                    'C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4',
                    'F4', 'F4', 'E4', 'E4', 'D4', 'D4', 'C4']
        },
        {
            id: 4, title: "Joyeux Anniversaire", composer: "Traditionnel",
            notes: ['C4', 'C4', 'D4', 'C4', 'F4', 'E4',
                    'C4', 'C4', 'D4', 'C4', 'G4', 'F4',
                    'C4', 'C4', 'C5', 'A4', 'F4', 'E4', 'D4',
                    'B4', 'B4', 'A4', 'F4', 'G4', 'F4',
                    'C4', 'C4', 'D4', 'C4', 'F4', 'E4',
                    'C4', 'C4', 'D4', 'C4', 'G4', 'F4',
                    'C4', 'C4', 'C5', 'A4', 'F4', 'E4', 'D4',
                    'B4', 'B4', 'A4', 'F4', 'G4', 'F4',
                    'D4', 'D4', 'E4', 'D4', 'A4', 'G4',
                    'D4', 'D4', 'E4', 'D4', 'B4', 'A4',
                    'D4', 'D4', 'D5', 'B4', 'G4', 'F4', 'E4',
                    'C5', 'C5', 'B4', 'G4', 'A4', 'G4',
                    'C4', 'C4', 'D4', 'C4', 'F4', 'E4',
                    'C4', 'C4', 'D4', 'C4', 'G4', 'F4',
                    'C4', 'C4', 'C5', 'A4', 'F4', 'E4', 'D4',
                    'B4', 'B4', 'A4', 'F4', 'G4', 'F4']
        },
        {
            id: 5, title: "Gamme de Do Majeur", composer: "Exercice",
            notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5',
                    'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4',
                    'C4', 'E4', 'D4', 'F4', 'E4', 'G4', 'F4', 'A4',
                    'G4', 'B4', 'A4', 'C5', 'B4', 'D5', 'C5', 'E5',
                    'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4',
                    'D4', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
                    'C5', 'D5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4',
                    'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5',
                    'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4',
                    'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5',
                    'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4',
                    'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'B4',
                    'A4', 'G4', 'F4', 'E4', 'D4', 'C4']
        }
    ],
    2: [
        {
            id: 1, title: "Ode à la Joie", composer: "Beethoven",
            notes: ['E4', 'E4', 'F4', 'G4', 'G4', 'F4', 'E4', 'D4',
                    'C4', 'C4', 'D4', 'E4', 'E4', 'D4', 'D4',
                    'E4', 'E4', 'F4', 'G4', 'G4', 'F4', 'E4', 'D4',
                    'C4', 'C4', 'D4', 'E4', 'D4', 'C4', 'C4',
                    'D4', 'D4', 'E4', 'C4', 'D4', 'E4', 'F4', 'E4', 'C4',
                    'D4', 'E4', 'F4', 'E4', 'D4', 'C4', 'D4', 'G3',
                    'E4', 'E4', 'F4', 'G4', 'G4', 'F4', 'E4', 'D4',
                    'C4', 'C4', 'D4', 'E4', 'E4', 'D4', 'D4',
                    'G4', 'G4', 'A4', 'B4', 'B4', 'A4', 'G4', 'F4',
                    'E4', 'E4', 'F4', 'G4', 'G4', 'F4', 'E4',
                    'E4', 'E4', 'F4', 'G4', 'G4', 'F4', 'E4', 'D4',
                    'C4', 'C4', 'D4', 'E4', 'D4', 'C4', 'C4',
                    'D4', 'E4', 'C4', 'D4', 'E4', 'F4', 'E4', 'D4', 'C4',
                    'E4', 'E4', 'F4', 'G4', 'G4', 'F4', 'E4', 'D4',
                    'C4', 'C4', 'D4', 'E4', 'E4', 'D4', 'D4', 'C4']
        },
        {
            id: 2, title: "La Lettre à Élise (Intro)", composer: "Beethoven",
            notes: ['E5', 'D#5', 'E5', 'D#5', 'E5', 'B4', 'D5', 'C5', 'A4',
                    'C4', 'E4', 'A4', 'B4', 'E4', 'A4', 'B4', 'C5',
                    'E4', 'E5', 'D#5', 'E5', 'D#5', 'E5', 'B4', 'D5', 'C5', 'A4',
                    'C4', 'E4', 'A4', 'B4', 'E4', 'C5', 'B4', 'A4',
                    'E5', 'D#5', 'E5', 'D#5', 'E5', 'B4', 'D5', 'C5', 'A4',
                    'C4', 'E4', 'A4', 'B4', 'E4', 'A4', 'B4', 'C5',
                    'E4', 'E5', 'D#5', 'E5', 'D#5', 'E5', 'B4', 'D5', 'C5', 'A4',
                    'B4', 'C5', 'D5', 'E5', 'G4', 'F5', 'E5', 'D5',
                    'F4', 'E5', 'D5', 'C5', 'E4', 'D5', 'C5', 'B4',
                    'E4', 'E5', 'D#5', 'E5', 'D#5', 'E5', 'B4', 'D5', 'C5', 'A4',
                    'C4', 'E4', 'A4', 'B4', 'E4', 'A4', 'B4', 'C5',
                    'E4', 'E5', 'D#5', 'E5', 'D#5', 'E5', 'B4', 'D5', 'C5', 'A4',
                    'C4', 'E4', 'A4', 'B4', 'E4', 'C5', 'B4', 'A4']
        },
        {
            id: 3, title: "Mary Had a Little Lamb", composer: "Traditionnel",
            notes: ['E4', 'D4', 'C4', 'D4', 'E4', 'E4', 'E4',
                    'D4', 'D4', 'D4', 'E4', 'G4', 'G4',
                    'E4', 'D4', 'C4', 'D4', 'E4', 'E4', 'E4',
                    'D4', 'D4', 'E4', 'D4', 'C4',
                    'E4', 'D4', 'C4', 'D4', 'E4', 'E4', 'E4',
                    'D4', 'D4', 'D4', 'E4', 'G4', 'G4',
                    'E4', 'D4', 'C4', 'D4', 'E4', 'E4', 'E4',
                    'D4', 'D4', 'E4', 'D4', 'C4',
                    'G4', 'G4', 'F4', 'E4', 'D4', 'D4', 'D4',
                    'E4', 'E4', 'E4', 'F4', 'A4', 'A4',
                    'G4', 'G4', 'F4', 'E4', 'D4', 'D4', 'D4',
                    'E4', 'E4', 'F4', 'E4', 'D4',
                    'E4', 'D4', 'C4', 'D4', 'E4', 'E4', 'E4',
                    'D4', 'D4', 'D4', 'E4', 'G4', 'G4',
                    'E4', 'D4', 'C4', 'D4', 'E4', 'E4', 'E4',
                    'D4', 'D4', 'E4', 'D4', 'C4']
        },
        {
            id: 4, title: "London Bridge", composer: "Traditionnel",
            notes: ['G4', 'A4', 'G4', 'F4', 'E4', 'F4', 'G4',
                    'D4', 'E4', 'F4', 'E4', 'F4', 'G4',
                    'G4', 'A4', 'G4', 'F4', 'E4', 'F4', 'G4',
                    'D4', 'G4', 'E4', 'C4',
                    'G4', 'A4', 'G4', 'F4', 'E4', 'F4', 'G4',
                    'D4', 'E4', 'F4', 'E4', 'F4', 'G4',
                    'G4', 'A4', 'G4', 'F4', 'E4', 'F4', 'G4',
                    'D4', 'G4', 'E4', 'C4',
                    'A4', 'B4', 'A4', 'G4', 'F4', 'G4', 'A4',
                    'E4', 'F4', 'G4', 'F4', 'G4', 'A4',
                    'A4', 'B4', 'A4', 'G4', 'F4', 'G4', 'A4',
                    'E4', 'A4', 'F4', 'D4',
                    'G4', 'A4', 'G4', 'F4', 'E4', 'F4', 'G4',
                    'D4', 'E4', 'F4', 'E4', 'F4', 'G4',
                    'G4', 'A4', 'G4', 'F4', 'E4', 'F4', 'G4',
                    'D4', 'G4', 'E4', 'C4']
        },
        {
            id: 5, title: "Alouette", composer: "Traditionnel",
            notes: ['G4', 'E4', 'E4', 'G4', 'E4', 'E4',
                    'D4', 'E4', 'F4', 'F4', 'E4', 'D4', 'C4',
                    'G4', 'E4', 'E4', 'G4', 'E4', 'E4',
                    'D4', 'E4', 'F4', 'F4', 'E4', 'D4', 'C4',
                    'G4', 'G4', 'A4', 'A4', 'G4', 'G4',
                    'E4', 'F4', 'G4', 'G4', 'F4', 'E4', 'D4',
                    'G4', 'E4', 'E4', 'G4', 'E4', 'E4',
                    'D4', 'E4', 'F4', 'F4', 'E4', 'D4', 'C4',
                    'A4', 'A4', 'B4', 'B4', 'A4', 'A4',
                    'F4', 'G4', 'A4', 'A4', 'G4', 'F4', 'E4',
                    'G4', 'E4', 'E4', 'G4', 'E4', 'E4',
                    'D4', 'E4', 'F4', 'F4', 'E4', 'D4', 'C4',
                    'G4', 'E4', 'E4', 'G4', 'E4', 'E4',
                    'D4', 'E4', 'F4', 'F4', 'E4', 'D4', 'C4',
                    'C4', 'D4', 'E4', 'F4', 'G4', 'E4', 'C4']
        }
    ],
    3: [
        {
            id: 1, title: "Canon en Ré (Thème)", composer: "Pachelbel",
            notes: ['F4', 'E4', 'D4', 'C4', 'B3', 'A3', 'B3', 'C4',
                    'D4', 'C4', 'B3', 'A3', 'G3', 'A3', 'B3', 'G3',
                    'D4', 'E4', 'F4', 'G4', 'A4', 'G4', 'F4', 'E4', 'D4',
                    'F4', 'E4', 'D4', 'C4', 'B3', 'A3', 'B3', 'C4',
                    'D4', 'C4', 'B3', 'A3', 'G3', 'A3', 'B3', 'G3',
                    'A4', 'G4', 'F4', 'E4', 'D4', 'E4', 'F4', 'D4',
                    'G4', 'F4', 'E4', 'D4', 'C4', 'D4', 'E4', 'C4',
                    'F4', 'E4', 'D4', 'C4', 'B3', 'A3', 'B3', 'C4',
                    'D4', 'E4', 'F4', 'G4', 'A4', 'G4', 'F4', 'E4',
                    'D4', 'C4', 'B3', 'A3', 'G3', 'A3', 'B3', 'G3',
                    'D4', 'E4', 'F4', 'G4', 'A4', 'G4', 'F4', 'E4', 'D4',
                    'F4', 'E4', 'D4', 'C4', 'B3', 'A3', 'B3', 'C4',
                    'D4', 'C4', 'B3', 'A3', 'G3', 'A3', 'B3', 'G3', 'A3']
        },
        {
            id: 2, title: "Clair de Lune (Thème)", composer: "Debussy",
            notes: ['C4', 'E4', 'G4', 'C5', 'B4', 'G4',
                    'A4', 'F4', 'C4', 'D4', 'B3', 'G3',
                    'C4', 'E4', 'G4', 'C5', 'D5', 'B4', 'G4', 'E4', 'C4',
                    'D4', 'F4', 'A4', 'D5', 'C5', 'A4',
                    'B4', 'G4', 'D4', 'E4', 'C4', 'A3',
                    'C4', 'E4', 'G4', 'C5', 'B4', 'G4',
                    'A4', 'F4', 'C4', 'D4', 'B3', 'G3',
                    'E4', 'G4', 'B4', 'E5', 'D5', 'B4',
                    'C5', 'A4', 'E4', 'F4', 'D4', 'B3',
                    'C4', 'E4', 'G4', 'C5', 'D5', 'B4', 'G4', 'E4', 'C4',
                    'F4', 'A4', 'C5', 'F5', 'E5', 'C5',
                    'D5', 'B4', 'G4', 'E4', 'D4', 'C4',
                    'C4', 'E4', 'G4', 'C5', 'B4', 'G4', 'E4', 'C4']
        },
        {
            id: 3, title: "Gymnopédie No.1 (Extrait)", composer: "Erik Satie",
            notes: ['G4', 'A4', 'B4', 'D5', 'C5', 'B4', 'A4',
                    'G4', 'E4', 'D4', 'E4', 'G4',
                    'A4', 'B4', 'C5', 'D5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4',
                    'F4', 'G4', 'A4', 'C5', 'B4', 'A4', 'G4',
                    'F4', 'D4', 'C4', 'D4', 'F4',
                    'G4', 'A4', 'B4', 'D5', 'C5', 'B4', 'A4',
                    'G4', 'E4', 'D4', 'E4', 'G4',
                    'A4', 'B4', 'C5', 'E5', 'D5', 'C5', 'B4',
                    'A4', 'G4', 'F4', 'G4', 'A4',
                    'G4', 'A4', 'B4', 'D5', 'C5', 'B4', 'A4',
                    'G4', 'E4', 'D4', 'E4', 'G4',
                    'A4', 'B4', 'C5', 'D5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4',
                    'F4', 'E4', 'D4', 'C4', 'D4', 'E4', 'F4', 'G4']
        },
        {
            id: 4, title: "Le Lac des Cygnes (Thème)", composer: "Tchaïkovski",
            notes: ['E4', 'G4', 'B4', 'B4', 'C5', 'B4', 'A4',
                    'G4', 'E4', 'G4', 'E4', 'D4', 'E4',
                    'E4', 'G4', 'B4', 'B4', 'C5', 'B4', 'A4', 'G4',
                    'F4', 'A4', 'C5', 'C5', 'D5', 'C5', 'B4',
                    'A4', 'F4', 'A4', 'F4', 'E4', 'F4',
                    'E4', 'G4', 'B4', 'B4', 'C5', 'B4', 'A4',
                    'G4', 'E4', 'G4', 'E4', 'D4', 'E4',
                    'G4', 'B4', 'D5', 'D5', 'E5', 'D5', 'C5',
                    'B4', 'G4', 'B4', 'G4', 'F4', 'G4',
                    'E4', 'G4', 'B4', 'B4', 'C5', 'B4', 'A4',
                    'G4', 'E4', 'G4', 'E4', 'D4', 'E4',
                    'E4', 'G4', 'B4', 'B4', 'C5', 'B4', 'A4', 'G4',
                    'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5']
        },
        {
            id: 5, title: "Menuet en Sol", composer: "Bach",
            notes: ['D4', 'G4', 'A4', 'B4', 'C5', 'D5', 'G4', 'G4',
                    'E5', 'C5', 'D5', 'B4', 'A4', 'G4',
                    'D4', 'G4', 'A4', 'B4', 'C5', 'D5', 'G4', 'G4',
                    'E5', 'C5', 'D5', 'B4', 'A4', 'G4',
                    'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'D5', 'D5',
                    'B5', 'G5', 'A5', 'F5', 'E5', 'D5',
                    'D4', 'G4', 'A4', 'B4', 'C5', 'D5', 'G4', 'G4',
                    'E5', 'C5', 'D5', 'B4', 'A4', 'G4',
                    'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'B4', 'B4',
                    'C5', 'D5', 'E5', 'F5', 'G5', 'F5', 'E5', 'D5',
                    'D4', 'G4', 'A4', 'B4', 'C5', 'D5', 'G4', 'G4',
                    'E5', 'C5', 'D5', 'B4', 'A4', 'G4',
                    'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5']
        }
    ],
    4: [
        {
            id: 1, title: "Nocturne Op.9 No.2 (Intro)", composer: "Chopin",
            notes: ['E5', 'D5', 'E5', 'B4', 'D5', 'C5',
                    'A4', 'C4', 'E4', 'A4', 'B4',
                    'E4', 'A4', 'B4', 'C5',
                    'E4', 'E5', 'D5', 'E5', 'B4', 'D5', 'C5', 'A4',
                    'F5', 'E5', 'F5', 'C5', 'E5', 'D5',
                    'B4', 'D4', 'F4', 'B4', 'C5',
                    'F4', 'B4', 'C5', 'D5',
                    'E5', 'D5', 'E5', 'B4', 'D5', 'C5',
                    'A4', 'C4', 'E4', 'A4', 'B4',
                    'E4', 'A4', 'B4', 'C5',
                    'G5', 'F5', 'G5', 'D5', 'F5', 'E5',
                    'C5', 'E4', 'G4', 'C5', 'D5',
                    'E5', 'D5', 'E5', 'B4', 'D5', 'C5', 'A4',
                    'A4', 'C4', 'E4', 'A4', 'B4',
                    'E4', 'A4', 'B4', 'C5',
                    'E4', 'E5', 'D5', 'E5', 'B4', 'D5', 'C5', 'A4',
                    'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'G5',
                    'F5', 'E5', 'D5', 'C5', 'B4', 'A4']
        },
        {
            id: 2, title: "Prélude en Do Majeur", composer: "Bach",
            notes: ['C4', 'E4', 'G4', 'C5', 'E5', 'G4', 'C5', 'E5',
                    'C4', 'D4', 'A4', 'D5', 'F5', 'A4', 'D5', 'F5',
                    'B3', 'D4', 'G4', 'D5', 'F5', 'G4', 'D5', 'F5',
                    'C4', 'E4', 'G4', 'C5', 'E5', 'G4', 'C5', 'E5',
                    'C4', 'E4', 'A4', 'E5', 'A5', 'A4', 'E5', 'A5',
                    'C4', 'D4', 'F#4', 'A4', 'D5', 'F#4', 'A4', 'D5',
                    'B3', 'D4', 'G4', 'D5', 'G5', 'G4', 'D5', 'G5',
                    'B3', 'C4', 'E4', 'G4', 'C5', 'E4', 'G4', 'C5',
                    'A3', 'C4', 'E4', 'G4', 'C5', 'E4', 'G4', 'C5',
                    'D3', 'A3', 'D4', 'F#4', 'C5', 'D4', 'F#4', 'C5',
                    'G3', 'B3', 'D4', 'G4', 'B4', 'D4', 'G4', 'B4',
                    'C4', 'E4', 'G4', 'C5', 'E5', 'G4', 'C5', 'E5',
                    'C4', 'D4', 'A4', 'D5', 'F5', 'A4', 'D5', 'F5',
                    'B3', 'D4', 'G4', 'D5', 'F5', 'G4', 'D5', 'F5', 'C4']
        },
        {
            id: 3, title: "Rêverie (Extrait)", composer: "Debussy",
            notes: ['F4', 'A4', 'C5', 'F5', 'E5', 'C5',
                    'D5', 'B4', 'G4', 'E4', 'D4', 'C4',
                    'F4', 'A4', 'C5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'F4',
                    'E4', 'G4', 'B4', 'E5', 'D5', 'B4',
                    'C5', 'A4', 'F4', 'D4', 'C4', 'B3',
                    'F4', 'A4', 'C5', 'F5', 'E5', 'C5',
                    'D5', 'B4', 'G4', 'E4', 'D4', 'C4',
                    'G4', 'B4', 'D5', 'G5', 'F5', 'D5',
                    'E5', 'C5', 'A4', 'F4', 'E4', 'D4',
                    'F4', 'A4', 'C5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'F4',
                    'A4', 'C5', 'E5', 'A5', 'G5', 'E5',
                    'F5', 'D5', 'B4', 'G4', 'F4', 'E4',
                    'F4', 'A4', 'C5', 'F5', 'E5', 'C5',
                    'D5', 'B4', 'G4', 'E4', 'D4', 'C4', 'B3', 'C4']
        },
        {
            id: 4, title: "Arabesque No.1 (Thème)", composer: "Debussy",
            notes: ['E4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5',
                    'D5', 'C5', 'B4', 'A4', 'G4', 'E4',
                    'G4', 'A4', 'B4', 'C5', 'B4', 'A4', 'G4',
                    'F4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5',
                    'E5', 'D5', 'C5', 'B4', 'A4', 'F4',
                    'E4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5',
                    'D5', 'C5', 'B4', 'A4', 'G4', 'E4',
                    'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5',
                    'A5', 'G5', 'F5', 'E5', 'D5', 'C5',
                    'G4', 'A4', 'B4', 'C5', 'B4', 'A4', 'G4',
                    'E4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5',
                    'D5', 'C5', 'B4', 'A4', 'G4', 'E4',
                    'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5',
                    'F5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4']
        },
        {
            id: 5, title: "Sonate Pathétique (2ème mvt)", composer: "Beethoven",
            notes: ['A4', 'B4', 'C5', 'D5', 'E5', 'D5', 'C5', 'B4',
                    'A4', 'A4', 'B4', 'C5', 'B4', 'A4', 'G4',
                    'F4', 'E4', 'D4', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4',
                    'B4', 'C5', 'D5', 'E5', 'F5', 'E5', 'D5', 'C5',
                    'B4', 'B4', 'C5', 'D5', 'C5', 'B4', 'A4',
                    'A4', 'B4', 'C5', 'D5', 'E5', 'D5', 'C5', 'B4',
                    'A4', 'A4', 'B4', 'C5', 'B4', 'A4', 'G4',
                    'C5', 'D5', 'E5', 'F5', 'G5', 'F5', 'E5', 'D5',
                    'C5', 'C5', 'D5', 'E5', 'D5', 'C5', 'B4',
                    'F4', 'E4', 'D4', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4',
                    'A4', 'B4', 'C5', 'D5', 'E5', 'D5', 'C5', 'B4',
                    'A4', 'A4', 'B4', 'C5', 'B4', 'A4', 'G4',
                    'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G4', 'A4']
        }
    ],
    5: [
        {
            id: 1, title: "Fantaisie Impromptu (Thème)", composer: "Chopin",
            notes: ['C5', 'D5', 'E5', 'G5', 'E5', 'D5', 'C5',
                    'B4', 'A4', 'G4', 'E4', 'G4', 'A4', 'B4', 'C5',
                    'D5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4',
                    'E5', 'F5', 'G5', 'B5', 'G5', 'F5', 'E5',
                    'D5', 'C5', 'B4', 'G4', 'B4', 'C5', 'D5', 'E5',
                    'C5', 'D5', 'E5', 'G5', 'E5', 'D5', 'C5',
                    'B4', 'A4', 'G4', 'E4', 'G4', 'A4', 'B4', 'C5',
                    'F5', 'G5', 'A5', 'C6', 'A5', 'G5', 'F5',
                    'E5', 'D5', 'C5', 'A4', 'C5', 'D5', 'E5', 'F5',
                    'D5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4',
                    'C5', 'D5', 'E5', 'G5', 'E5', 'D5', 'C5',
                    'B4', 'A4', 'G4', 'E4', 'G4', 'A4', 'B4', 'C5',
                    'D5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4',
                    'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5']
        },
        {
            id: 2, title: "La Campanella (Simplifié)", composer: "Liszt",
            notes: ['E5', 'E5', 'E5', 'E5', 'D5', 'C5', 'B4',
                    'E5', 'E5', 'E5', 'E5', 'D5', 'E5',
                    'E5', 'D5', 'C5', 'B4', 'A4', 'G4',
                    'G5', 'G5', 'G5', 'G5', 'F5', 'E5', 'D5',
                    'G5', 'G5', 'G5', 'G5', 'F5', 'G5',
                    'E5', 'E5', 'E5', 'E5', 'D5', 'C5', 'B4',
                    'E5', 'E5', 'E5', 'E5', 'D5', 'E5',
                    'A5', 'A5', 'A5', 'A5', 'G5', 'F5', 'E5',
                    'A5', 'A5', 'A5', 'A5', 'G5', 'A5',
                    'E5', 'D5', 'C5', 'B4', 'A4', 'G4',
                    'E5', 'E5', 'E5', 'E5', 'D5', 'C5', 'B4',
                    'E5', 'E5', 'E5', 'E5', 'D5', 'E5',
                    'G5', 'F5', 'E5', 'D5', 'C5', 'B4', 'A4',
                    'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4']
        },
        {
            id: 3, title: "Valse Minute (Extrait)", composer: "Chopin",
            notes: ['D5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4',
                    'A4', 'B4', 'C5', 'D5', 'E5',
                    'D5', 'C5', 'B4', 'A4', 'G4', 'A4', 'B4', 'G4',
                    'E5', 'F5', 'E5', 'D5', 'C5', 'B4', 'A4',
                    'B4', 'C5', 'D5', 'E5', 'F5',
                    'D5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4',
                    'A4', 'B4', 'C5', 'D5', 'E5',
                    'G5', 'A5', 'G5', 'F5', 'E5', 'D5', 'C5',
                    'D5', 'E5', 'F5', 'G5', 'A5',
                    'D5', 'C5', 'B4', 'A4', 'G4', 'A4', 'B4', 'G4',
                    'D5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4',
                    'A4', 'B4', 'C5', 'D5', 'E5',
                    'F5', 'G5', 'F5', 'E5', 'D5', 'C5', 'B4',
                    'D5', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4']
        },
        {
            id: 4, title: "Révolutionnaire (Mélodie)", composer: "Chopin",
            notes: ['C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4',
                    'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5',
                    'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4',
                    'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4',
                    'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5',
                    'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4',
                    'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5',
                    'G5', 'F5', 'E5', 'D5', 'C5', 'B4', 'A4', 'G4',
                    'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5', 'A5',
                    'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4',
                    'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4',
                    'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5',
                    'E5', 'D5', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4']
        },
        {
            id: 5, title: "Clair de Lune 3ème (Thème)", composer: "Beethoven",
            notes: ['C4', 'E4', 'G4', 'C5', 'E5', 'G4', 'C5', 'E5',
                    'C4', 'E4', 'A4', 'C5', 'E5', 'A4', 'C5', 'E5',
                    'D4', 'A4', 'D5', 'A4', 'D5',
                    'E4', 'B4', 'E5', 'B4', 'G4', 'E4',
                    'C4', 'E4', 'G4', 'C5', 'E5', 'G4', 'C5', 'E5',
                    'F4', 'A4', 'C5', 'F5', 'A5', 'C5', 'F5', 'A5',
                    'D4', 'F4', 'A4', 'D5', 'F5', 'A4', 'D5', 'F5',
                    'G3', 'B3', 'D4', 'G4', 'B4', 'D4', 'G4', 'B4',
                    'C4', 'E4', 'G4', 'C5', 'E5', 'G4', 'C5', 'E5',
                    'C4', 'E4', 'A4', 'C5', 'E5', 'A4', 'C5', 'E5',
                    'B3', 'D4', 'G4', 'B4', 'D5', 'G4', 'B4', 'D5',
                    'A3', 'C4', 'E4', 'A4', 'C5', 'E4', 'A4', 'C5',
                    'D4', 'A4', 'D5', 'A4', 'D5',
                    'E4', 'B4', 'E5', 'B4', 'G4', 'E4', 'C4']
        }
    ]
};

// ==================== ÉTAT DU JEU ====================
let gameState = {
    currentLevel: 1,
    currentSong: null,
    currentNoteIndex: 0,
    score: 0,
    correctNotes: 0,
    wrongNotes: 0,
    isPlaying: false,
    isPaused: true,
    startTime: null,
    countdownInterval: null
};

let playerProgress = {
    songsLearned: 0,
    practiceTime: 0,
    currentLevel: 1,
    completedSongs: {}
};

// ==================== NOTES QUI DESCENDENT ====================
const FALL_CONFIG = {
    maxVisible: 20,
    speed: 0.16,
    startY: -120,
    spacing: 24,
    hitWindow: 24,
    hitOffset: 12,
    missOffset: 50
};

let fallState = {
    track: null,
    notes: [],
    nextSpawnIndex: 0,
    hitY: 0,
    lastFrame: null,
    rafId: null
};

// ==================== INITIALISATION ====================
document.addEventListener('DOMContentLoaded', () => {
    setupPianoStyle();
    setupTheme();
    initAudio();
    loadProgress();
    createParticles();
    initBgCanvas();
    setupPiano('piano');
    setupHomePiano();
    setupKeyboardControls();
    updateHomeStats();
    window.addEventListener('resize', () => {
        updateFallingTrackSize();
        refreshFallingNotePositions();
        positionBlackKeys(document.getElementById('piano'));
        resizeBgCanvas();
    });
});

// ==================== THEME ====================
const THEME_KEY = 'napMusique_theme';

function setupTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);

    // Setup toggle button in dropdown
    const themeToggleDropdown = document.getElementById('theme-toggle-dropdown');
    if (themeToggleDropdown) {
        themeToggleDropdown.addEventListener('click', () => {
            const next = document.body.dataset.theme === 'light' ? 'dark' : 'light';
            applyTheme(next);
        });
    }
    
    // Setup settings menu
    setupSettingsMenu();
}

function setupSettingsMenu() {
    const settingsBtn = document.getElementById('settings-btn');
    const settingsPanel = document.getElementById('settings-panel');
    
    if (settingsBtn && settingsPanel) {
        settingsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsPanel.classList.toggle('open');
        });
        
        // Prevent closing menu when clicking inside panel
        settingsPanel.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
                settingsPanel.classList.remove('open');
            }
        });
        
        // Close menu when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                settingsPanel.classList.remove('open');
            }
        });
    }
    
    // Reset data button
    const resetBtn = document.getElementById('reset-data-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Êtes-vous sûr? Cela réinitialisera tous vos progrès.')) {
                localStorage.clear();
                location.reload();
            }
        });
    }
    
    // Notifications toggle
    const notificationsToggle = document.getElementById('notifications-toggle');
    if (notificationsToggle) {
        const saved = localStorage.getItem('napMusique_notifications');
        notificationsToggle.checked = saved !== 'disabled';
        
        notificationsToggle.addEventListener('change', () => {
            if (notificationsToggle.checked) {
                localStorage.removeItem('napMusique_notifications');
            } else {
                localStorage.setItem('napMusique_notifications', 'disabled');
            }
        });
    }
    
    // Piano style selector in settings
    const pianoStyleBtns = document.querySelectorAll('.piano-style-option-btn');
    if (pianoStyleBtns.length > 0) {
        // Set active button based on current style
        pianoStyleBtns.forEach(btn => {
            if (btn.dataset.style === currentPianoStyle) {
                btn.classList.add('active');
            }
            
            btn.addEventListener('click', () => {
                currentPianoStyle = btn.dataset.style;
                localStorage.setItem(PIANO_STYLE_KEY, currentPianoStyle);
                
                // Update active state
                pianoStyleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
}

function applyTheme(theme) {
    document.body.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);

    const themeToggleDropdown = document.getElementById('theme-toggle-dropdown');
    if (themeToggleDropdown) {
        if (theme === 'light') {
            themeToggleDropdown.className = 'theme-btn-light';
            themeToggleDropdown.innerHTML = '<span class="theme-icon">🌙</span><span class="theme-text">Mode Sombre</span>';
        } else {
            themeToggleDropdown.className = 'theme-btn-dark';
            themeToggleDropdown.innerHTML = '<span class="theme-icon">☀️</span><span class="theme-text">Mode Clair</span>';
        }
    }

    createParticles();
}

// ==================== PIANO STYLE ====================
function setupPianoStyle() {
    const saved = localStorage.getItem(PIANO_STYLE_KEY);
    currentPianoStyle = saved || 'classic';
    
    const buttons = document.querySelectorAll('.piano-style-btn');
    
    // Retirer la classe active de tous les boutons d'abord
    buttons.forEach(b => b.classList.remove('active'));
    
    buttons.forEach(btn => {
        if (btn.dataset.style === currentPianoStyle) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', () => {
            currentPianoStyle = btn.dataset.style;
            localStorage.setItem(PIANO_STYLE_KEY, currentPianoStyle);
            
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function initAudio() {
    document.addEventListener('click', () => {
        if (!audioContext) {
            audioContext = new AudioContext();
        }
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    }, { once: true });
}

function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    container.innerHTML = '';
    const colors = document.body.dataset.theme === 'light'
        ? ['#5b7cff', '#00b4d8', '#ff6ea8', '#f59e0b', '#7c9dff', '#12b981']
        : ['#6c5ce7', '#00cec9', '#fd79a8', '#fdcb6e', '#e84393', '#00b894'];
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (12 + Math.random() * 10) + 's';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = (3 + Math.random() * 5) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// ==================== NAVIGATION ====================
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
        page.style.animation = 'none';
        page.offsetHeight;
        page.style.animation = 'fadeIn 0.5s ease-out';
    }
    
    // Cacher le toggle de thème quand on joue du piano
    const themeToggle = document.getElementById('theme-toggle');
    const pianoStyleSelector = document.getElementById('piano-style-selector');
    const settingsMenu = document.querySelector('.settings-menu');
    
    if (themeToggle) {
        if (pageId === 'game-page' || pageId === 'free-play-page') {
            themeToggle.style.display = 'none';
        } else {
            themeToggle.style.display = '';
        }
    }
    
    if (pianoStyleSelector) {
        if (pageId === 'game-page' || pageId === 'free-play-page') {
            pianoStyleSelector.style.display = 'none';
        } else {
            pianoStyleSelector.style.display = '';
        }
    }

    if (settingsMenu) {
        if (pageId === 'game-page') {
            settingsMenu.style.display = 'none';
        } else {
            settingsMenu.style.display = '';
        }
    }
    
    if (pageId === 'free-play-page') {
        setupFreePiano();
    }
    
    if (pageId === 'home-page') {
        updateHomeStats();
    }

    if (pageId !== 'game-page') {
        clearFallingNotes();
    }
}

// ==================== PIANO ====================

// Animation des touches quand on joue
function createKeyEffects(key) {
    const rect = key.getBoundingClientRect();
    const isBlack = key.classList.contains('black-key');
    const colors = isBlack 
        ? ['#9b59b6', '#8e44ad', '#6c5ce7', '#a29bfe']
        : ['#00b894', '#00cec9', '#55efc4', '#81ecec', '#74b9ff', '#a29bfe'];
    
    // Créer des particules
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'key-particle';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.setProperty('--dx', (Math.random() - 0.5) * 120 + 'px');
        particle.style.setProperty('--dy', -30 - Math.random() * 80 + 'px');
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
    
    // Créer des notes de musique flottantes
    const noteSymbols = ['♪', '♫', '♬', '♩', '♭', '♯'];
    const floatNote = document.createElement('div');
    floatNote.className = 'floating-music-note';
    floatNote.textContent = noteSymbols[Math.floor(Math.random() * noteSymbols.length)];
    floatNote.style.left = rect.left + rect.width / 2 + 'px';
    floatNote.style.top = rect.top + 'px';
    floatNote.style.color = colors[Math.floor(Math.random() * colors.length)];
    floatNote.style.setProperty('--dx', (Math.random() - 0.5) * 60 + 'px');
    document.body.appendChild(floatNote);
    setTimeout(() => floatNote.remove(), 1200);
    
    // Effet de ripple
    const ripple = document.createElement('div');
    ripple.className = 'key-ripple';
    ripple.style.left = rect.left + rect.width / 2 + 'px';
    ripple.style.top = rect.top + rect.height / 2 + 'px';
    ripple.style.borderColor = colors[0];
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

function setupPiano(pianoId) {
    const piano = document.getElementById(pianoId);
    if (!piano) return;
    
    piano.querySelectorAll('.white-key, .black-key').forEach(key => {
        const handleStart = (e) => {
            e.preventDefault();
            const note = key.dataset.note;
            playNote(note);
            key.classList.add('pressed');
            createKeyEffects(key);
            
            if (gameState.isPlaying && !gameState.isPaused) {
                checkNote(note, key);
            }
        };
        
        const handleEnd = () => key.classList.remove('pressed');
        
        key.addEventListener('mousedown', handleStart);
        key.addEventListener('mouseup', handleEnd);
        key.addEventListener('mouseleave', handleEnd);
        key.addEventListener('touchstart', handleStart);
        key.addEventListener('touchend', handleEnd);
    });

    applyPianoLevel(gameState.currentLevel || 1, piano);
    positionBlackKeys(piano);
}

function setupFreePiano() {
    const freePiano = document.getElementById('free-piano');
    const mainPiano = document.getElementById('piano');
    
    if (freePiano && mainPiano) {
        freePiano.innerHTML = mainPiano.innerHTML;
        setupPiano('free-piano');
        applyPianoLevel(5, freePiano);
        positionBlackKeys(freePiano);
    }
}

function applyPianoLevel(level, piano) {
    if (!piano) return;
    piano.querySelectorAll('[data-min-level]').forEach((key) => {
        const minLevel = Number(key.dataset.minLevel || 1);
        if (level >= minLevel) {
            key.classList.remove('key-hidden');
        } else {
            key.classList.add('key-hidden');
        }
    });
}

function positionBlackKeys(piano) {
    if (!piano) return;

    const findWhiteSibling = (startEl, direction) => {
        let el = startEl;
        while (el) {
            el = direction === 'prev' ? el.previousElementSibling : el.nextElementSibling;
            if (!el) return null;
            if (el.classList.contains('white-key') && !el.classList.contains('key-hidden')) return el;
        }
        return null;
    };

    piano.querySelectorAll('.black-key').forEach((blackKey) => {
        if (blackKey.classList.contains('key-hidden')) return;

        const prevWhite = findWhiteSibling(blackKey, 'prev');
        const nextWhite = findWhiteSibling(blackKey, 'next');
        if (!prevWhite || !nextWhite) return;

        const left = prevWhite.offsetLeft + prevWhite.offsetWidth - blackKey.offsetWidth / 2;
        blackKey.style.left = `${left}px`;
    });
}

function setupKeyboardControls() {
    const keyMap = {
        // Blanches (24 premières) : YUIOP¨£QSDFGHJKLM%µ<WXCV
        'y': 'C3', 'u': 'D3', 'i': 'E3', 'o': 'F3', 'p': 'G3', '¨': 'A3', '£': 'B3',
        'q': 'C4', 's': 'D4', 'd': 'E4', 'f': 'F4', 'g': 'G4', 'h': 'A4', 'j': 'B4',
        'k': 'C5', 'l': 'D5', 'm': 'E5', '%': 'F5', 'µ': 'G5', '<': 'A5', 'w': 'B5',
        'x': 'C6', 'c': 'D6', 'v': 'E6',

        // Noires : ²1234567890°+AZER en ordre des dièses
        '²': 'C#3', '1': 'D#3', '2': 'F#3', '3': 'G#3', '4': 'A#3',
        '5': 'C#4', '6': 'D#4', '7': 'F#4', '8': 'G#4', '9': 'A#4',
        '0': 'C#5', '°': 'D#5', '+': 'F#5', 'a': 'G#5', 'z': 'A#5',
        'e': 'C#6', 'r': 'D#6'
    };
    
    const pressedKeys = new Set();
    
    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        
        if (keyMap[key] && !pressedKeys.has(key)) {
            pressedKeys.add(key);
            const note = keyMap[key];
            
            // Trouver la touche dans le piano actif
            const activePiano = document.querySelector('.page.active .piano') || document.getElementById('piano');
            const keyElement = activePiano?.querySelector(`[data-note="${note}"]`);
            
            if (keyElement) {
                playNote(note);
                keyElement.classList.add('pressed');
                createKeyEffects(keyElement);
                
                if (gameState.isPlaying && !gameState.isPaused) {
                    checkNote(note, keyElement);
                }
            }
        }
        
        if (e.key === ' ' && gameState.isPlaying) {
            e.preventDefault();
            togglePlayPause();
        }
        if (e.key === 'Escape' && gameState.isPlaying) {
            exitGame();
        }
    });
    
    document.addEventListener('keyup', (e) => {
        const key = e.key.toLowerCase();
        pressedKeys.delete(key);
        
        if (keyMap[key]) {
            const note = keyMap[key];
            document.querySelectorAll(`[data-note="${note}"]`).forEach(el => {
                el.classList.remove('pressed');
            });
        }
    });
}

// ==================== NOTES QUI DESCENDENT ====================
function setupFallingNotes() {
    fallState.track = document.getElementById('falling-notes-track');
    if (!fallState.track || !gameState.currentSong) return;

    fallState.track.innerHTML = '<div class="hit-line"></div>';
    fallState.notes = [];
    fallState.nextSpawnIndex = gameState.currentNoteIndex;

    updateFallingTrackSize();

    const max = Math.min(FALL_CONFIG.maxVisible, gameState.currentSong.notes.length - gameState.currentNoteIndex);
    for (let i = 0; i < max; i++) {
        const note = gameState.currentSong.notes[fallState.nextSpawnIndex];
        createFallingNote(note, FALL_CONFIG.startY - i * FALL_CONFIG.spacing);
        fallState.nextSpawnIndex++;
    }

    startFallingAnimation();
}

function updateFallingTrackSize() {
    const track = fallState.track;
    const piano = document.getElementById('piano');
    if (!track || !piano) return;

    const pianoRect = piano.getBoundingClientRect();
    track.style.width = `${pianoRect.width}px`;
    const hitLine = track.querySelector('.hit-line');
    if (hitLine) {
        fallState.hitY = hitLine.offsetTop + hitLine.offsetHeight / 2;
    } else {
        fallState.hitY = Math.max(40, track.clientHeight - 40);
    }
}

function refreshFallingNotePositions() {
    if (!fallState.track) return;
    fallState.notes.forEach(noteObj => {
        const x = getNoteCenterX(noteObj.note);
        noteObj.el.style.left = `${x}px`;
    });
}

function getNoteCenterX(note) {
    const key = document.querySelector(`#piano [data-note="${note}"]`);
    const track = fallState.track;
    if (!key || !track) return 0;

    const keyRect = key.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    return keyRect.left + keyRect.width / 2 - trackRect.left;
}

function createFallingNote(note, startY) {
    if (!fallState.track) return;

    const noteName = note.replace(/\d/, '');
    const frenchName = NOTE_NAMES_FR[noteName] || noteName;
    const x = getNoteCenterX(note);

    const el = document.createElement('div');
    el.className = `falling-note ${note.includes('#') ? 'sharp' : ''}`;
    el.dataset.note = note;
    el.textContent = frenchName;
    el.style.left = `${x}px`;
    el.style.transform = `translate(-50%, ${startY}px)`;

    fallState.track.appendChild(el);
    fallState.notes.push({ el, note, y: startY });
}

function startFallingAnimation() {
    if (fallState.rafId) cancelAnimationFrame(fallState.rafId);
    fallState.lastFrame = null;
    fallState.rafId = requestAnimationFrame(stepFallingNotes);
}

function stepFallingNotes(timestamp) {
    if (!gameState.isPlaying) return;

    if (fallState.lastFrame === null) fallState.lastFrame = timestamp;
    const delta = timestamp - fallState.lastFrame;
    fallState.lastFrame = timestamp;

    if (!gameState.isPaused) {
        // Les notes descendent sans s'arrêter
        fallState.notes.forEach(noteObj => {
            noteObj.y += FALL_CONFIG.speed * delta;
            noteObj.el.style.transform = `translate(-50%, ${noteObj.y}px)`;
        });

        // Vérifier les notes qui dépassent la zone (ratées)
        const missThreshold = fallState.hitY + FALL_CONFIG.missOffset;
        while (fallState.notes.length > 0) {
            const first = fallState.notes[0];
            const firstHeight = first?.el?.offsetHeight || 32;
            const firstBottom = first ? first.y + firstHeight : 0;
            if (firstBottom <= missThreshold) break;
            const missed = fallState.notes[0];
            // Compter comme raté
            if (!missed.handled) {
                gameState.wrongNotes++;
                gameState.score = Math.max(0, gameState.score - 25);
                showFeedback('✗', 'wrong');
                document.getElementById('game-score').textContent = gameState.score;
                gameState.currentNoteIndex++;
                updateProgress();
            }
            // Retirer la note visuellement
            missed.el.classList.add('missed');
            setTimeout(() => missed.el.remove(), 300);
            fallState.notes.shift();

            // Spawn la prochaine note
            spawnNextFallingNote();

            // Vérifier fin de chanson
            if (gameState.currentNoteIndex >= gameState.currentSong.notes.length && fallState.notes.length === 0) {
                setTimeout(() => endGame(), 500);
                break;
            } else {
                highlightNextNote();
            }
        }
    }

    fallState.rafId = requestAnimationFrame(stepFallingNotes);
}

function advanceFallingNotes() {
    if (!fallState.track || !gameState.currentSong) return;

    const first = fallState.notes.shift();
    if (first) {
        first.handled = true;
        first.el.classList.add('correct-hit');
        setTimeout(() => first.el.remove(), 300);
    }

    spawnNextFallingNote();
}

function spawnNextFallingNote() {
    if (!fallState.track || !gameState.currentSong) return;
    const song = gameState.currentSong;

    if (fallState.nextSpawnIndex < song.notes.length) {
        let spawnY = FALL_CONFIG.startY;
        // Maintain exact spacing relative to the last note
        if (fallState.notes.length > 0) {
            const lastNote = fallState.notes[fallState.notes.length - 1];
            spawnY = lastNote.y - FALL_CONFIG.spacing;
        }
        
        createFallingNote(song.notes[fallState.nextSpawnIndex], spawnY);
        fallState.nextSpawnIndex++;
    }
}

function clearFallingNotes() {
    if (fallState.rafId) cancelAnimationFrame(fallState.rafId);
    fallState.rafId = null;
    fallState.lastFrame = null;
    fallState.notes.forEach(noteObj => noteObj.el.remove());
    fallState.notes = [];
    if (fallState.track) {
        fallState.track.innerHTML = '<div class="hit-line"></div>';
    }
}

// ==================== AUDIO ====================

// Piano Classique
function playClassicPiano(frequency, now) {
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(frequency, now);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(frequency * 2, now);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2500, now);
    filter.Q.setValueAtTime(1, now);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.4, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.2, now + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 2);
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    osc1.start();
    osc2.start();
    osc1.stop(now + 2);
    osc2.stop(now + 2);
}

// Piano Électrique
function playElectricPiano(frequency, now) {
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const osc3 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(frequency, now);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(frequency * 2, now);
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(frequency * 4, now);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3500, now);
    filter.Q.setValueAtTime(2, now);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.5, now + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.3, now + 0.2);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
    
    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    osc1.start();
    osc2.start();
    osc3.start();
    osc1.stop(now + 1.5);
    osc2.stop(now + 1.5);
    osc3.stop(now + 1.5);
}

// Synthétiseur
function playSynth(frequency, now) {
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    const lfo = audioContext.createOscillator();
    const lfoGain = audioContext.createGain();
    
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(frequency, now);
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(frequency * 1.01, now);
    
    // LFO pour vibrato
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(5, now);
    lfoGain.gain.setValueAtTime(10, now);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1500, now);
    filter.frequency.linearRampToValueAtTime(4000, now + 0.3);
    filter.Q.setValueAtTime(5, now);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.35, now + 0.02);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 2);
    
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    lfo.start();
    osc1.start();
    osc2.start();
    lfo.stop(now + 2);
    osc1.stop(now + 2);
    osc2.stop(now + 2);
}

// Orgue
function playOrgan(frequency, now) {
    const oscillators = [];
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    // Harmoniques d'orgue
    const harmonics = [
        { mult: 0.5, gain: 0.3 },
        { mult: 1, gain: 0.8 },
        { mult: 2, gain: 0.4 },
        { mult: 3, gain: 0.3 },
        { mult: 4, gain: 0.2 },
        { mult: 5, gain: 0.15 }
    ];
    
    harmonics.forEach(h => {
        const osc = audioContext.createOscillator();
        const oscGain = audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency * h.mult, now);
        oscGain.gain.setValueAtTime(h.gain, now);
        osc.connect(oscGain);
        oscGain.connect(filter);
        oscillators.push(osc);
    });
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3000, now);
    filter.Q.setValueAtTime(1, now);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.4, now + 0.05);
    gainNode.gain.setValueAtTime(0.4, now + 1.5);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 2);
    
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillators.forEach(osc => {
        osc.start();
        osc.stop(now + 2);
    });
}

// Clavecin
function playHarpsichord(frequency, now) {
    const oscillators = [];
    const gainNode = audioContext.createGain();
    
    // Harmoniques de clavecin
    const harmonics = [
        { mult: 1, gain: 0.6 },
        { mult: 2, gain: 0.4 },
        { mult: 3, gain: 0.25 },
        { mult: 4, gain: 0.15 }
    ];
    
    harmonics.forEach(h => {
        const osc = audioContext.createOscillator();
        const oscGain = audioContext.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(frequency * h.mult, now);
        oscGain.gain.setValueAtTime(h.gain, now);
        osc.connect(oscGain);
        oscGain.connect(gainNode);
        oscillators.push(osc);
    });
    
    // Attaque très rapide, déclin rapide (caractéristique du clavecin)
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.5, now + 0.002);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    
    gainNode.connect(audioContext.destination);
    
    oscillators.forEach(osc => {
        osc.start();
        osc.stop(now + 0.8);
    });
}

// Boîte à musique
function playMusicBox(frequency, now) {
    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency * 2, now);
    
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3000, now);
    filter.Q.setValueAtTime(10, now);
    
    // Son éthéré et doux
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 2.5);
    
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    osc.start();
    osc.stop(now + 2.5);
}

// Cloche
function playBell(frequency, now) {
    const oscillators = [];
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    // Harmoniques métalliques de cloche
    const harmonics = [
        { mult: 1, gain: 0.6 },
        { mult: 2.4, gain: 0.4 },
        { mult: 3.8, gain: 0.3 },
        { mult: 5.1, gain: 0.2 },
        { mult: 6.7, gain: 0.1 }
    ];
    
    harmonics.forEach(h => {
        const osc = audioContext.createOscillator();
        const oscGain = audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency * h.mult, now);
        oscGain.gain.setValueAtTime(h.gain, now);
        osc.connect(oscGain);
        oscGain.connect(filter);
        oscillators.push(osc);
    });
    
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(200, now);
    filter.Q.setValueAtTime(1, now);
    
    // Longue résonance
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.4, now + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 4);
    
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillators.forEach(osc => {
        osc.start();
        osc.stop(now + 4);
    });
}

// Marimba
function playMarimba(frequency, now) {
    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(frequency, now);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(frequency * 3.8, now);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, now);
    filter.Q.setValueAtTime(2, now);
    
    // Attaque douce, déclin rapide
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.45, now + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    osc1.start();
    osc2.start();
    osc1.stop(now + 1.5);
    osc2.stop(now + 1.5);
}

function playNote(note) {
    if (!audioContext) {
        audioContext = new AudioContext();
    }
    
    const frequency = NOTE_FREQUENCIES[note];
    if (!frequency) return;
    
    const now = audioContext.currentTime;
    
    switch(currentPianoStyle) {
        case 'classic':
            playClassicPiano(frequency, now);
            break;
        case 'electric':
            playElectricPiano(frequency, now);
            break;
        case 'synth':
            playSynth(frequency, now);
            break;
        case 'organ':
            playOrgan(frequency, now);
            break;
        case 'harpsichord':
            playHarpsichord(frequency, now);
            break;
        case 'musicbox':
            playMusicBox(frequency, now);
            break;
        case 'bell':
            playBell(frequency, now);
            break;
        case 'marimba':
            playMarimba(frequency, now);
            break;
        default:
            playClassicPiano(frequency, now);
    }
}

// ==================== LOGIQUE DU JEU ====================
function checkNote(playedNote, keyElement) {
    const song = gameState.currentSong;
    if (!song || gameState.currentNoteIndex >= song.notes.length) return;
    
    const expectedNote = song.notes[gameState.currentNoteIndex];
    
    // Retirer le highlight actuel
    document.querySelectorAll('#piano .highlight').forEach(el => el.classList.remove('highlight'));
    
    // Vérifier si la première note visible est proche de la zone de frappe
    const firstNote = fallState.notes.length > 0 ? fallState.notes[0] : null;
    const noteHeight = firstNote?.el?.offsetHeight || 32;
    const noteBottomY = firstNote ? firstNote.y + noteHeight : 0;
    const hitWindow = FALL_CONFIG.hitWindow;
    const hitOffset = FALL_CONFIG.hitOffset;
    const hitZoneTop = fallState.hitY - hitWindow + hitOffset;
    const hitZoneBottom = fallState.hitY + hitWindow + hitOffset;
    const isInHitZone = firstNote && noteBottomY >= hitZoneTop && noteBottomY <= hitZoneBottom;
    
    if (playedNote === expectedNote && isInHitZone) {
        // Bonne note jouée au bon moment !
        gameState.correctNotes++;
        gameState.score += 100;
        
        keyElement.classList.add('correct');
        showFeedback('✓', 'correct');
        
        setTimeout(() => keyElement.classList.remove('correct'), 400);
        
        gameState.currentNoteIndex++;
        updateProgress();
        advanceFallingNotes();
        
        if (gameState.currentNoteIndex >= song.notes.length && fallState.notes.length === 0) {
            setTimeout(() => endGame(), 500);
        } else {
            highlightNextNote();
        }
    } else {
        // Mauvaise note ou pas dans la zone de frappe
        gameState.wrongNotes++;
        gameState.score = Math.max(0, gameState.score - 25);
        
        keyElement.classList.add('wrong');
        showFeedback('✗', 'wrong');
        
        setTimeout(() => keyElement.classList.remove('wrong'), 400);
        
        highlightNextNote();
    }
    
    document.getElementById('game-score').textContent = gameState.score;
}

function highlightNextNote() {
    const song = gameState.currentSong;
    if (!song || gameState.currentNoteIndex >= song.notes.length) return;

    const nextNote = song.notes[gameState.currentNoteIndex];
    const piano = document.getElementById('piano');

    // Identifier la touche cible
    const targetKey = piano.querySelector(`[data-note="${nextNote}"]`);

    // Retirer le highlight des touches qui ne sont PAS la cible
    piano.querySelectorAll('.highlight').forEach(el => {
        if (el !== targetKey) {
            el.classList.remove('highlight');
        }
    });

    // Ajouter le highlight si nécessaire (évite de redémarrer l'animation)
    if (targetKey && !targetKey.classList.contains('highlight')) {
        targetKey.classList.add('highlight');
    }

    // Mettre à jour l'affichage
    updateNoteDisplay(nextNote);
    updateUpcomingNotes();
}

function updateNoteDisplay(note) {
    const noteToPlay = document.getElementById('note-to-play');
    const noteHint = document.getElementById('note-hint');
    
    if (noteToPlay) {
        const noteName = note.replace(/\d/, '');
        const octave = note.match(/\d/)?.[0] || '';
        const frenchName = NOTE_NAMES_FR[noteName] || noteName;
        noteToPlay.textContent = frenchName + octave;
    }
    
    if (noteHint) {
        const keyElement = document.querySelector(`[data-note="${note}"]`);
        if (keyElement) {
            const keyBind = keyElement.dataset.key?.toUpperCase() || '';
            noteHint.textContent = `Touche clavier: ${keyBind} ou cliquez sur la touche verte`;
        }
    }
}

function updateUpcomingNotes() {
    const song = gameState.currentSong;
    const container = document.getElementById('upcoming-notes');
    if (!container || !song) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < 6; i++) {
        const noteIndex = gameState.currentNoteIndex + i;
        if (noteIndex < song.notes.length) {
            const note = song.notes[noteIndex];
            const noteName = note.replace(/\d/, '');
            const frenchName = NOTE_NAMES_FR[noteName] || noteName;
            
            const noteEl = document.createElement('div');
            noteEl.className = 'upcoming-note';
            noteEl.textContent = frenchName;
            container.appendChild(noteEl);
        }
    }
}

function updateProgress() {
    const song = gameState.currentSong;
    if (!song) return;
    
    const progress = (gameState.currentNoteIndex / song.notes.length) * 100;
    document.getElementById('song-progress').style.width = progress + '%';
    document.getElementById('progress-text').textContent = Math.round(progress) + '%';
}

// ==================== GESTION DU JEU ====================
function selectLevel(levelNum) {
    gameState.currentLevel = levelNum;
    
    const levelNames = {
        1: 'Les Bases', 2: 'Progression', 3: 'Maîtrise', 4: 'Virtuose', 5: 'Maestro'
    };
    
    document.getElementById('level-title').textContent = `Niveau ${levelNum} - ${levelNames[levelNum]}`;
    
    const container = document.getElementById('songs-list');
    container.innerHTML = '';
    
    const songs = songsData[levelNum];
    
    songs.forEach((song, index) => {
        const isCompleted = playerProgress.completedSongs[`${levelNum}-${song.id}`];
        
        const card = document.createElement('div');
        card.className = `song-card ${isCompleted ? 'completed' : ''}`;
        card.onclick = () => startGame(song);
        
        card.innerHTML = `
            <div class="song-header">
                <div class="song-number">${index + 1}</div>
                <div class="song-details">
                    <div class="song-title">${song.title}</div>
                    <div class="song-composer">${song.composer}</div>
                </div>
            </div>
            <div class="song-meta">
                <div class="meta-item">
                    <span class="icon">🎵</span>
                    <span>${song.notes.length} notes</span>
                </div>
                <div class="meta-item">
                    <span class="icon">⏱️</span>
                    <span>~${Math.ceil(song.notes.length / 10)} min</span>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    showPage('songs-page');
}

function startGame(song) {
    gameState.currentSong = song;
    gameState.currentNoteIndex = 0;
    gameState.score = 0;
    gameState.correctNotes = 0;
    gameState.wrongNotes = 0;
    gameState.isPlaying = true;
    gameState.isPaused = true;
    gameState.startTime = Date.now();
    
    document.getElementById('current-song').textContent = song.title;
    document.getElementById('game-score').textContent = '0';
    document.getElementById('song-progress').style.width = '0%';
    document.getElementById('progress-text').textContent = '0%';
    const icon = document.getElementById('play-pause-icon');
    if (icon) icon.textContent = '⏸';
    
    showPage('game-page');
    
    setTimeout(() => {
        applyPianoLevel(gameState.currentLevel, document.getElementById('piano'));
        positionBlackKeys(document.getElementById('piano'));
        clearFallingNotes();
        // lancer automatiquement le compte à rebours et la partie
        gameState.isPaused = false;
        startCountdown();
        showNotification("⏱️ Prépare-toi, la partie va commencer...");
    }, 600);
}

function togglePlayPause() {
    gameState.isPaused = !gameState.isPaused;
    const icon = document.getElementById('play-pause-icon');
    
    if (!gameState.isPaused) {
        if (icon) icon.textContent = '⏸';
        startCountdown();
    } else {
        if (icon) icon.textContent = '▶';
        // Annuler le compte à rebours si en cours
        if (gameState.countdownInterval) {
            clearInterval(gameState.countdownInterval);
            gameState.countdownInterval = null;
            document.getElementById('countdown-overlay').style.display = 'none';
        }
        document.querySelectorAll('#piano .highlight').forEach(el => el.classList.remove('highlight'));
        showNotification("⏸ Pause - Appuyez sur ▶ pour continuer");
    }
}

function startCountdown() {
    const overlay = document.getElementById('countdown-overlay');
    const numberEl = document.getElementById('countdown-number');
    
    if (!overlay || !numberEl) {
        console.error('Countdown elements not found');
        // Démarrer directement le jeu si les éléments n'existent pas
        highlightNextNote();
        startFallingAnimation();
        showNotification("🎵 C'est parti! Jouez la note verte!");
        return;
    }
    
    let count = 3;
    
    overlay.style.display = 'flex';
    numberEl.textContent = count;
    numberEl.style.animation = 'none';
    
    // Force reflow pour redémarrer l'animation
    setTimeout(() => {
        numberEl.style.animation = 'countdownPulse 1s ease-in-out';
    }, 10);
    
    gameState.countdownInterval = setInterval(() => {
        count--;
        
        if (count > 0) {
            numberEl.textContent = count;
            numberEl.style.animation = 'none';
            setTimeout(() => {
                numberEl.style.animation = 'countdownPulse 1s ease-in-out';
            }, 10);
        } else if (count === 0) {
            numberEl.textContent = 'GO!';
            numberEl.style.animation = 'none';
            setTimeout(() => {
                numberEl.style.animation = 'countdownPulse 1s ease-in-out';
            }, 10);
        } else {
            clearInterval(gameState.countdownInterval);
            gameState.countdownInterval = null;
            overlay.style.display = 'none';
            highlightNextNote();
            setupFallingNotes();
            showNotification("🎵 C'est parti! Jouez la note verte!");
        }
    }, 1000);
}

function restartSong() {
    if (gameState.currentSong) {
        startGame(gameState.currentSong);
    }
}

function exitGame() {
    gameState.isPlaying = false;
    gameState.isPaused = true;
    const icon = document.getElementById('play-pause-icon');
    if (icon) icon.textContent = '▶';
    
    // Nettoyer le compte à rebours si actif
    if (gameState.countdownInterval) {
        clearInterval(gameState.countdownInterval);
        gameState.countdownInterval = null;
        const overlay = document.getElementById('countdown-overlay');
        if (overlay) overlay.style.display = 'none';
    }
    
    document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
    clearFallingNotes();
    showPage('songs-page');
}

function endGame() {
    gameState.isPlaying = false;
    document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
    clearFallingNotes();
    
    const song = gameState.currentSong;
    const totalNotes = song.notes.length;
    const accuracy = Math.round((gameState.correctNotes / (gameState.correctNotes + gameState.wrongNotes)) * 100) || 0;
    
    let stars = 0;
    if (accuracy >= 95) stars = 3;
    else if (accuracy >= 80) stars = 2;
    else if (accuracy >= 60) stars = 1;
    
    if (stars >= 1) {
        const key = `${gameState.currentLevel}-${song.id}`;
        if (!playerProgress.completedSongs[key] || playerProgress.completedSongs[key] < stars) {
            playerProgress.completedSongs[key] = stars;
        }
        playerProgress.songsLearned = Object.keys(playerProgress.completedSongs).length;
    }
    
    const practiceMinutes = Math.max(1, Math.round((Date.now() - gameState.startTime) / 60000));
    playerProgress.practiceTime += practiceMinutes;
    
    saveProgress();
    showResults(accuracy, stars);
}

function showResults(accuracy, stars) {
    let icon = '🎉', title = 'Bravo!', message = 'Continuez à pratiquer!';
    
    if (stars === 3) {
        icon = '🏆'; title = 'PARFAIT!'; message = 'Vous êtes un virtuose du piano!';
    } else if (stars === 2) {
        icon = '⭐'; title = 'Excellent!'; message = 'Encore un petit effort pour la perfection!';
    } else if (stars === 1) {
        icon = '👍'; title = 'Bien joué!'; message = 'La pratique mène à la perfection!';
    } else {
        icon = '💪'; title = 'Continuez!'; message = 'Ne vous découragez pas, réessayez!';
    }
    
    document.getElementById('result-icon').textContent = icon;
    document.getElementById('results-title').textContent = title;
    document.getElementById('results-subtitle').textContent = `Vous avez terminé "${gameState.currentSong.title}"`;
    document.getElementById('results-message').textContent = message;
    
    document.getElementById('accuracy-value').textContent = accuracy + '%';
    document.getElementById('final-score').textContent = gameState.score;
    document.getElementById('correct-notes').textContent = gameState.correctNotes;
    document.getElementById('wrong-notes').textContent = gameState.wrongNotes;
    
    // Animer le cercle de précision
    const circle = document.getElementById('accuracy-circle');
    if (circle) {
        const offset = 283 - (283 * accuracy / 100);
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 200);
    }
    
    // Animer les étoiles
    for (let i = 1; i <= 3; i++) {
        const starEl = document.getElementById(`star${i}`);
        starEl.className = 'big-star';
        starEl.textContent = '☆';
        
        if (i <= stars) {
            setTimeout(() => {
                starEl.classList.add('earned');
                starEl.textContent = '★';
            }, i * 400);
        }
    }
    
    showPage('results-page');
}

function replayGame() {
    if (gameState.currentSong) {
        // Reset le cercle de précision
        const circle = document.getElementById('accuracy-circle');
        if (circle) circle.style.strokeDashoffset = 283;
        
        startGame(gameState.currentSong);
    }
}

function setupHomePiano() {
    const piano = document.getElementById('home-piano');
    if (!piano) return;
    
    piano.querySelectorAll('.key').forEach(key => {
        const note = key.dataset.note;
        if (!note) return;
        
        const handleStart = (e) => {
            e.preventDefault();
            if (!audioContext) audioContext = new AudioContext();
            if (audioContext.state === 'suspended') audioContext.resume();
            playNote(note);
            key.classList.add('active');
        };
        
        const handleEnd = () => key.classList.remove('active');
        
        key.addEventListener('mousedown', handleStart);
        key.addEventListener('mouseup', handleEnd);
        key.addEventListener('mouseleave', handleEnd);
        key.addEventListener('touchstart', handleStart, { passive: false });
        key.addEventListener('touchend', handleEnd);
    });
}

// ==================== FEEDBACK ====================
function showFeedback(text, type) {
    const popup = document.getElementById('feedback-popup');
    if (!popup) return;
    
    popup.textContent = text;
    popup.className = `feedback-popup show ${type}`;
    
    setTimeout(() => popup.classList.remove('show'), 700);
}

function showNotification(message) {
    const existing = document.querySelector('.game-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'game-notification';
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #6c5ce7, #00cec9);
        color: white;
        padding: 15px 35px;
        border-radius: 50px;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        font-size: 1rem;
        z-index: 10000;
        animation: slideDown 0.5s ease-out;
        box-shadow: 0 10px 40px rgba(108, 92, 231, 0.5);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        notification.style.transition = 'all 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// ==================== SAUVEGARDE ====================
function saveProgress() {
    localStorage.setItem('napMusique_v2_progress', JSON.stringify(playerProgress));
}

function loadProgress() {
    const saved = localStorage.getItem('napMusique_v2_progress');
    if (saved) {
        playerProgress = JSON.parse(saved);
    }
}

function updateHomeStats() {
    const songsEl = document.getElementById('total-songs-learned');
    const timeEl = document.getElementById('total-practice-time');
    const levelEl = document.getElementById('current-level-display');
    
    if (songsEl) songsEl.textContent = playerProgress.songsLearned;
    if (timeEl) timeEl.textContent = playerProgress.practiceTime + 'min';
    if (levelEl) levelEl.textContent = Math.min(5, Math.floor(playerProgress.songsLearned / 3) + 1);
}

// Style pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { opacity: 0; transform: translateX(-50%) translateY(-30px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
`;
document.head.appendChild(style);

// ==================== CURSEUR PERSONNALISÉ ULTRA ====================
function initCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    
    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    document.body.appendChild(follower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let lastTrailX = 0, lastTrailY = 0;
    let velocity = 0;
    let isClicking = false;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Boucle d'animation optimisée (RAF) pour éviter le lag
    function loop() {
        // Position du curseur principal
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';

        // Calculer la vélocité
        const moveDistance = Math.sqrt(
            Math.pow(mouseX - lastTrailX, 2) + 
            Math.pow(mouseY - lastTrailY, 2)
        );
        velocity = Math.min(moveDistance / 2, 20);
        
        // Créer une traînée si mouvement suffisant
        if (moveDistance > 2) {
            createTrail(mouseX, mouseY, velocity);
            lastTrailX = mouseX;
            lastTrailY = mouseY;
        }
        
        // Smooth follow pour le follower avec inertie
        const dx = mouseX - followerX;
        const dy = mouseY - followerY;
        
        followerX += dx * 0.18;
        followerY += dy * 0.18;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    
    // Détection du hover optimisée (sans elementFromPoint lourd)
    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        const clickable = target.closest('button, a, .clickable, .key, .white-key, .black-key, .feature-card, .song-card, .btn');
        
        if (clickable) {
            if (!cursor.classList.contains('hover')) {
                cursor.classList.add('hover');
                createMagneticPulse(mouseX, mouseY);
            }
        } else {
            cursor.classList.remove('hover');
        }
    });
    
    // Click events
    document.addEventListener('mousedown', (e) => {
        isClicking = true;
        createClickExplosion(e.clientX, e.clientY);
        createRipple(e.clientX, e.clientY);
        createStarburst(e.clientX, e.clientY);
        cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });
    
    document.addEventListener('mouseup', () => {
        isClicking = false;
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Cache le curseur au mouseout
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '0.7';
    });
    
    // Créer un trail avec une particule colorée
    function createTrail(x, y, vel) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail active';
        const size = 3 + vel * 0.6;
        trail.style.width = size + 'px';
        trail.style.height = size + 'px';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        
        // Couleur gradient basée sur la vélocité
        const hue = 190 + (vel * 8) % 35;
        const saturation = 75 + (vel * 4) % 25;
        const lightness = 45 + (vel * 3) % 20;
        
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        trail.style.background = `radial-gradient(circle, ${color} 0%, rgba(108, 92, 231, 0.08) 100%)`;
        trail.style.boxShadow = `0 0 ${8 + vel * 2}px ${color}, inset 0 0 ${4 + vel}px ${color}`;
        
        document.body.appendChild(trail);
        
        // Trail secondaire avec délai
        if (Math.random() > 0.6) {
            setTimeout(() => {
                const trail2 = document.createElement('div');
                trail2.className = 'cursor-trail-2 active';
                trail2.style.width = (size * 1.5) + 'px';
                trail2.style.height = (size * 1.5) + 'px';
                trail2.style.left = x + 'px';
                trail2.style.top = y + 'px';
                trail2.style.background = `radial-gradient(circle, rgba(0, 206, 201, 0.3) 0%, transparent 70%)`;
                trail2.style.boxShadow = `0 0 ${12 + vel * 1.5}px rgba(0, 206, 201, 0.4)`;
                document.body.appendChild(trail2);
                setTimeout(() => trail2.remove(), 1000);
            }, 5);
        }
        
        setTimeout(() => trail.remove(), 1000);
    }
    
    // Explosion au clic
    function createClickExplosion(x, y) {
        const particleCount = 16 + Math.random() * 12;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'explosion-particle burst';
            
            const size = 2.5 + Math.random() * 5.5;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.borderRadius = '50%';
            
            // Couleurs dynamiques
            const colors = [
                'rgba(0, 206, 201, 0.9)', 
                'rgba(108, 92, 231, 0.9)', 
                'rgba(253, 121, 168, 0.9)',
                'rgba(253, 206, 100, 0.8)'
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;
            particle.style.boxShadow = `0 0 ${12 + Math.random() * 12}px ${color}`;
            
            // Direction circulaire
            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.8;
            const distance = 80 + Math.random() * 120;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 700);
        }
    }
    
    // Onde d'impact
    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        ripple.style.left = (x - 5) + 'px';
        ripple.style.top = (y - 5) + 'px';
        ripple.style.borderColor = 'var(--secondary)';
        ripple.style.boxShadow = '0 0 20px rgba(0, 206, 201, 0.8)';
        
        document.body.appendChild(ripple);
        
        // Deuxième ripple avec délai
        setTimeout(() => {
            const ripple2 = document.createElement('div');
            ripple2.className = 'cursor-ripple';
            ripple2.style.left = (x - 5) + 'px';
            ripple2.style.top = (y - 5) + 'px';
            ripple2.style.borderColor = 'var(--primary)';
            ripple2.style.boxShadow = '0 0 30px rgba(108, 92, 231, 0.6)';
            ripple2.style.animation = 'ripple 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
            document.body.appendChild(ripple2);
            setTimeout(() => ripple2.remove(), 800);
        }, 100);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    // Starburst exlosif
    function createStarburst(x, y) {
        const burstCount = 8;
        for (let i = 0; i < burstCount; i++) {
            const ray = document.createElement('div');
            ray.style.position = 'fixed';
            ray.style.pointerEvents = 'none';
            ray.style.zIndex = '9995';
            
            const angle = (Math.PI * 2 * i) / burstCount;
            const length = 40 + Math.random() * 60;
            
            ray.style.width = '2px';
            ray.style.height = length + 'px';
            ray.style.left = x + 'px';
            ray.style.top = y + 'px';
            ray.style.background = `linear-gradient(to bottom, rgba(0, 206, 201, 1) 0%, rgba(0, 206, 201, 0) 100%)`;
            ray.style.boxShadow = `0 0 10px rgba(0, 206, 201, 0.8), 0 0 20px rgba(108, 92, 231, 0.4)`;
            ray.style.transformOrigin = 'center top';
            ray.style.transform = `rotate(${(angle * 180) / Math.PI}deg) translateY(-${length / 2}px)`;
            
            ray.style.animation = `starburst-fade ${0.6 + Math.random() * 0.4}s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
            
            document.body.appendChild(ray);
            setTimeout(() => ray.remove(), 1000);
        }
    }
    
    // Pulse magnétique au hover
    function createMagneticPulse(x, y) {
        const pulse = document.createElement('div');
        pulse.style.position = 'fixed';
        pulse.style.left = x + 'px';
        pulse.style.top = y + 'px';
        pulse.style.width = '3px';
        pulse.style.height = '3px';
        pulse.style.borderRadius = '50%';
        pulse.style.background = 'var(--accent)';
        pulse.style.boxShadow = '0 0 15px var(--accent)';
        pulse.style.pointerEvents = 'none';
        pulse.style.zIndex = '9995';
        pulse.style.animation = 'magnetic-pulse 0.5s ease-out forwards';
        
        document.body.appendChild(pulse);
        setTimeout(() => pulse.remove(), 500);
    }
    
    // Glow additionnel au hover (ancien)
    function createHoverGlow(x, y) {
        // Effet optionnel supplémentaire
        follower.style.boxShadow = `
            0 0 40px rgba(253, 121, 168, 0.9),
            0 0 80px rgba(108, 92, 231, 0.7),
            0 0 120px rgba(0, 206, 201, 0.5)
        `;
    }
}

// Initialiser le curseur quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursor);
} else {
    initCursor();
}

console.log('🎹 Nap Musique v2 - Apprenez le Piano! Chargé avec succès.');

// ==================== CANVAS ANIMÉ ARRIÈRE-PLAN ====================
let bgCanvas, bgCtx;
let bgParticles = [];
let bgConnections = [];
let bgAnimFrame;
const BG_PARTICLE_COUNT = 60;
const BG_CONNECTION_DIST = 150;

function resizeBgCanvas() {
    if (!bgCanvas) return;
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
}

function initBgCanvas() {
    bgCanvas = document.getElementById('bg-canvas');
    if (!bgCanvas) return;
    bgCtx = bgCanvas.getContext('2d');
    resizeBgCanvas();

    bgParticles = [];
    for (let i = 0; i < BG_PARTICLE_COUNT; i++) {
        bgParticles.push({
            x: Math.random() * bgCanvas.width,
            y: Math.random() * bgCanvas.height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            radius: 1.5 + Math.random() * 2.5,
            color: ['rgba(139,92,246,', 'rgba(6,182,212,', 'rgba(244,114,182,', 'rgba(16,185,129,'][Math.floor(Math.random() * 4)],
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.01 + Math.random() * 0.02
        });
    }

    animateBgCanvas();
}

function animateBgCanvas() {
    if (!bgCtx || !bgCanvas) return;
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    const isLight = document.body.dataset.theme === 'light';
    const baseAlpha = isLight ? 0.15 : 0.4;
    const lineAlpha = isLight ? 0.06 : 0.12;

    // Update & draw particles
    for (let i = 0; i < bgParticles.length; i++) {
        const p = bgParticles[i];
        p.pulse += p.pulseSpeed;
        const pulseFactor = 0.5 + Math.sin(p.pulse) * 0.5;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = bgCanvas.width + 10;
        if (p.x > bgCanvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = bgCanvas.height + 10;
        if (p.y > bgCanvas.height + 10) p.y = -10;

        // Draw glow
        const glowAlpha = baseAlpha * pulseFactor;
        bgCtx.beginPath();
        const gradient = bgCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 8);
        gradient.addColorStop(0, p.color + (glowAlpha * 0.4) + ')');
        gradient.addColorStop(1, p.color + '0)');
        bgCtx.fillStyle = gradient;
        bgCtx.arc(p.x, p.y, p.radius * 8, 0, Math.PI * 2);
        bgCtx.fill();

        // Draw dot
        bgCtx.beginPath();
        bgCtx.arc(p.x, p.y, p.radius * (0.8 + pulseFactor * 0.4), 0, Math.PI * 2);
        bgCtx.fillStyle = p.color + (baseAlpha + pulseFactor * 0.3) + ')';
        bgCtx.fill();

        // Draw connections
        for (let j = i + 1; j < bgParticles.length; j++) {
            const p2 = bgParticles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < BG_CONNECTION_DIST) {
                const alpha = lineAlpha * (1 - dist / BG_CONNECTION_DIST);
                bgCtx.beginPath();
                bgCtx.moveTo(p.x, p.y);
                bgCtx.lineTo(p2.x, p2.y);
                bgCtx.strokeStyle = p.color + alpha + ')';
                bgCtx.lineWidth = 0.8;
                bgCtx.stroke();
            }
        }
    }

    bgAnimFrame = requestAnimationFrame(animateBgCanvas);
}
