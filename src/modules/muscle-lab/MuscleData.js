
// Muscle Data Module
// Single source of truth for Muscle Anatomy and Lesion Sites
// Extracted from muscle-study-system.js

export const MuscleDatabase = {
    // ========== UPPER EXTREMITY MUSCLES - ORGANIZED BY PERIPHERAL NERVE ==========

    // 1. SPINAL ACCESSORY NERVE
    'Trapezius (upper)': { nerve: 'Spinal accessory', roots: ['C3', 'C4'], region: 'UE', peripheralNerve: 'Spinal accessory', cord: 'N/A (cranial nerve)', actions: 'Shoulder elevation, scapular retraction' },

    // 2. DORSAL SCAPULAR NERVE
    'Rhomboids': { nerve: 'Dorsal scapular', roots: ['C5'], region: 'UE', peripheralNerve: 'Dorsal scapular', cord: 'Root (C5)', actions: 'Scapular retraction and downward rotation' },

    // 3. LONG THORACIC NERVE
    'Serratus anterior': { nerve: 'Long thoracic', roots: ['C5', 'C6', 'C7'], region: 'UE', peripheralNerve: 'Long thoracic', cord: 'Roots (C5, C6, C7)', actions: 'Scapular protraction and upward rotation' },

    // 4. SUPRASCAPULAR NERVE
    'Supraspinatus': { nerve: 'Suprascapular', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Suprascapular', cord: 'Upper trunk', actions: 'Shoulder abduction initiation' },
    'Infraspinatus': { nerve: 'Suprascapular', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Suprascapular', cord: 'Upper trunk', actions: 'Shoulder external rotation' },

    // 5. SUBSCAPULAR AND LOWER SUBSCAPULAR NERVES
    'Subscapularis': { nerve: 'Subscapular', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Subscapular', cord: 'Posterior cord', actions: 'Shoulder internal rotation' },
    'Teres major': { nerve: 'Lower subscapular', roots: ['C5', 'C6', 'C7'], region: 'UE', peripheralNerve: 'Lower subscapular', cord: 'Posterior cord', actions: 'Shoulder adduction, internal rotation, extension' },

    // 6. PECTORAL NERVES (LATERAL AND MEDIAL)
    'Pectoralis major': { nerve: 'Pectoral', roots: ['C5', 'C6', 'C7', 'C8', 'T1'], region: 'UE', peripheralNerve: 'Pectoral', cord: 'Lateral/Medial cord', actions: 'Shoulder adduction, internal rotation' },

    // 7. THORACODORSAL NERVE
    'Latissimus dorsi': { nerve: 'Thoracodorsal', roots: ['C6', 'C7', 'C8'], region: 'UE', peripheralNerve: 'Thoracodorsal', cord: 'Posterior cord', actions: 'Shoulder adduction, extension, internal rotation' },

    // 8. AXILLARY NERVE
    'Deltoid': { nerve: 'Axillary', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Axillary', cord: 'Posterior cord', actions: 'Shoulder abduction, flexion, extension' },
    'Teres minor': { nerve: 'Axillary', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Axillary', cord: 'Posterior cord', actions: 'Shoulder external rotation' },

    // 9. MUSCULOCUTANEOUS NERVE
    'Biceps brachii': { nerve: 'Musculocutaneous', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Musculocutaneous', cord: 'Lateral cord', actions: 'Elbow flexion, forearm supination' },
    'Brachialis (Musculocutaneous)': { nerve: 'Musculocutaneous/Radial', roots: ['C5', 'C6', 'C7'], region: 'UE', peripheralNerve: 'Musculocutaneous', cord: 'Lateral/Posterior cord', actions: 'Elbow flexion' },
    'Coracobrachialis': { nerve: 'Musculocutaneous', roots: ['C5', 'C6', 'C7'], region: 'UE', peripheralNerve: 'Musculocutaneous', cord: 'Lateral cord', actions: 'Shoulder flexion, adduction' },

    // 10. RADIAL NERVE
    'Brachioradialis': { nerve: 'Radial', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Elbow flexion, forearm rotation' },
    'Triceps brachii': { nerve: 'Radial', roots: ['C6', 'C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Elbow extension' },
    'Brachialis (Radial)': { nerve: 'Musculocutaneous/Radial', roots: ['C5', 'C6', 'C7'], region: 'UE', peripheralNerve: 'Radial', cord: 'Lateral/Posterior cord', actions: 'Elbow flexion' },
    'Anconeus': { nerve: 'Radial', roots: ['C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Elbow extension, stabilizes elbow joint' },
    'Extensor carpi radialis': { nerve: 'Radial', roots: ['C6', 'C7'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Wrist extension and radial deviation' },
    'Supinator': { nerve: 'Posterior interosseous', roots: ['C5', 'C6'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Forearm supination' },
    'Extensor digitorum': { nerve: 'Posterior interosseous', roots: ['C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Finger extension at MCP joints' },
    'Extensor carpi ulnaris': { nerve: 'Posterior interosseous', roots: ['C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Wrist extension and ulnar deviation' },
    'Extensor pollicis longus': { nerve: 'Posterior interosseous', roots: ['C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Thumb extension and retropulsion' },
    'Extensor indicis': { nerve: 'Posterior interosseous', roots: ['C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Index finger extension' },
    'Abductor pollicis longus': { nerve: 'Posterior interosseous', roots: ['C7', 'C8'], region: 'UE', peripheralNerve: 'Radial', cord: 'Posterior cord', actions: 'Thumb abduction and extension' },

    // 11. MEDIAN NERVE
    'Pronator teres': { nerve: 'Median', roots: ['C6', 'C7'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Forearm pronation, elbow flexion' },
    'Flexor carpi radialis': { nerve: 'Median', roots: ['C6', 'C7'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Wrist flexion and radial deviation' },
    'Palmaris longus': { nerve: 'Median', roots: ['C7', 'C8'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Wrist flexion, tenses palmar aponeurosis' },
    'Flexor digitorum superficialis': { nerve: 'Median', roots: ['C7', 'C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Finger flexion at PIP joints' },
    'Flexor digitorum profundus (digits 2&3)': { nerve: 'Anterior interosseous', roots: ['C7', 'C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Finger flexion at DIP joints (index, middle)' },
    'Flexor pollicis longus': { nerve: 'Anterior interosseous', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Thumb flexion at IP joint' },
    'Pronator quadratus': { nerve: 'Anterior interosseous', roots: ['C7', 'C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Forearm pronation' },
    'Abductor pollicis brevis': { nerve: 'Median', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Thumb abduction' },
    'Opponens pollicis': { nerve: 'Median', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Median', cord: 'Lateral/Medial cord', actions: 'Thumb opposition' },

    // 12. ULNAR NERVE
    'Flexor carpi ulnaris': { nerve: 'Ulnar', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', actions: 'Wrist flexion and ulnar deviation' },
    'Flexor digitorum profundus (digits 4&5)': { nerve: 'Ulnar', roots: ['C7', 'C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', actions: 'Finger flexion at DIP joints (ring, little)' },
    'Adductor pollicis': { nerve: 'Ulnar', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', actions: 'Thumb adduction' },
    'First dorsal interosseous': { nerve: 'Ulnar', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', actions: 'Index finger abduction' },
    'Abductor digiti minimi': { nerve: 'Ulnar', roots: ['C8', 'T1'], region: 'UE', peripheralNerve: 'Ulnar', cord: 'Medial cord', actions: 'Little finger abduction' },

    // ========== LOWER EXTREMITY MUSCLES - ORGANIZED BY PERIPHERAL NERVE ==========

    // 1. SUPERIOR GLUTEAL NERVE
    'Gluteus medius': { nerve: 'Superior gluteal', roots: ['L4', 'L5', 'S1'], region: 'LE', peripheralNerve: 'Superior gluteal', actions: 'Hip abduction, medial rotation (anterior fibers), lateral rotation (posterior fibers)' },
    'Gluteus minimus': { nerve: 'Superior gluteal', roots: ['L4', 'L5', 'S1'], region: 'LE', peripheralNerve: 'Superior gluteal', actions: 'Hip abduction, medial rotation, stabilizes pelvis' },
    'Tensor fasciae latae': { nerve: 'Superior gluteal', roots: ['L4', 'L5', 'S1'], region: 'LE', peripheralNerve: 'Superior gluteal', actions: 'Hip flexion, abduction, medial rotation, stabilizes IT band' },

    // 2. INFERIOR GLUTEAL NERVE
    'Gluteus maximus': { nerve: 'Inferior gluteal', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Inferior gluteal', actions: 'Hip extension, lateral rotation, upper fibers assist in abduction' },

    // 3. NERVE TO PIRIFORMIS
    'Piriformis': { nerve: 'Nerve to piriformis', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Piriformis', actions: 'Hip lateral rotation, abduction when hip is flexed' },

    // 4. FEMORAL NERVE
    'Iliopsoas': { nerve: 'Lumbar plexus/Femoral', roots: ['L1', 'L2', 'L3'], region: 'LE', peripheralNerve: 'Lumbar plexus', actions: 'Hip flexion, stabilizes lumbar spine' },
    'Pectineus': { nerve: 'Femoral', roots: ['L2', 'L3'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Hip flexion, adduction' },
    'Rectus femoris': { nerve: 'Femoral', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Knee extension, hip flexion' },
    'Vastus lateralis': { nerve: 'Femoral', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Knee extension' },
    'Vastus medialis': { nerve: 'Femoral', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Knee extension' },
    'Vastus intermedius': { nerve: 'Femoral', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Knee extension' },
    'Sartorius': { nerve: 'Femoral', roots: ['L2', 'L3'], region: 'LE', peripheralNerve: 'Femoral', actions: 'Hip flexion, abduction, external rotation; knee flexion' },

    // 5. OBTURATOR NERVE
    'Obturator externus': { nerve: 'Obturator', roots: ['L3', 'L4'], region: 'LE', peripheralNerve: 'Obturator', actions: 'Hip external rotation, adduction' },
    'Adductor longus': { nerve: 'Obturator', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Obturator', actions: 'Hip adduction, flexion' },
    'Adductor magnus (Obturator)': { nerve: 'Obturator', roots: ['L2', 'L3', 'L4'], region: 'LE', peripheralNerve: 'Obturator', actions: 'Hip adduction, flexion' },
    'Gracilis': { nerve: 'Obturator', roots: ['L2', 'L3'], region: 'LE', peripheralNerve: 'Obturator', actions: 'Hip adduction, knee flexion' },

    // 6. SCIATIC NERVE
    'Biceps femoris': { nerve: 'Sciatic', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Sciatic', actions: 'Knee flexion, hip extension' },
    'Semitendinosus': { nerve: 'Sciatic (tibial division)', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Sciatic', actions: 'Knee flexion, hip extension' },
    'Semimembranosus': { nerve: 'Sciatic (tibial division)', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Sciatic', actions: 'Knee flexion, hip extension' },
    'Adductor magnus (Sciatic)': { nerve: 'Obturator/Sciatic', roots: ['L4', 'L5', 'S1'], region: 'LE', peripheralNerve: 'Sciatic', actions: 'Hip adduction, extension (posterior fibers)' },

    // 7. TIBIAL NERVE
    'Gastrocnemius': { nerve: 'Tibial', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Ankle plantarflexion, knee flexion' },
    'Soleus': { nerve: 'Tibial', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Ankle plantarflexion' },
    'Tibialis posterior': { nerve: 'Tibial', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Ankle plantarflexion, foot inversion' },
    'Flexor digitorum longus': { nerve: 'Tibial', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Toe flexion, ankle plantarflexion' },
    'Flexor hallucis longus': { nerve: 'Tibial', roots: ['L5', 'S1', 'S2'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Great toe flexion, ankle plantarflexion' },
    'Abductor hallucis': { nerve: 'Tibial', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Great toe abduction, supports medial arch' },
    'Abductor digiti minimi pedis': { nerve: 'Tibial', roots: ['S1', 'S2'], region: 'LE', peripheralNerve: 'Tibial', actions: 'Little toe abduction, supports lateral arch' },

    // 8. PERONEAL NERVE (DEEP PERONEAL)
    'Tibialis anterior': { nerve: 'Deep peroneal', roots: ['L4', 'L5'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Ankle dorsiflexion, foot inversion' },
    'Extensor digitorum longus': { nerve: 'Deep peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Toe extension, ankle dorsiflexion' },
    'Extensor hallucis longus': { nerve: 'Deep peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Great toe extension, ankle dorsiflexion' },
    'Extensor digitorum brevis': { nerve: 'Deep peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Toe extension at MTP joints' },
    'Peroneus tertius': { nerve: 'Deep peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Ankle dorsiflexion, foot eversion' },

    // 9. PERONEAL NERVE (SUPERFICIAL PERONEAL)
    'Fibularis longus': { nerve: 'Superficial peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Ankle plantarflexion, foot eversion' },
    'Fibularis brevis': { nerve: 'Superficial peroneal', roots: ['L5', 'S1'], region: 'LE', peripheralNerve: 'Peroneal', actions: 'Foot eversion' }
};

export const LesionSites = {
    UE: {
        'C5 nerve root': { type: 'root', muscles: ['Deltoid', 'Biceps brachii', 'Supraspinatus', 'Infraspinatus'] },
        'C6 nerve root': { type: 'root', muscles: ['Biceps brachii', 'Brachioradialis', 'Extensor carpi radialis'] },
        'C7 nerve root': { type: 'root', muscles: ['Triceps brachii', 'Extensor digitorum', 'Flexor carpi radialis'] },
        'C8 nerve root': { type: 'root', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Flexor carpi ulnaris'] },
        'T1 nerve root': { type: 'root', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Abductor digiti minimi'] },
        'Upper trunk (C5-C6)': { type: 'plexus', muscles: ['Deltoid', 'Biceps brachii', 'Supraspinatus', 'Brachioradialis'] },
        'Lower trunk (C8-T1)': { type: 'plexus', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Flexor carpi ulnaris', 'Abductor digiti minimi'] },
        'Posterior cord': { type: 'plexus', muscles: ['Deltoid', 'Triceps brachii', 'Extensor digitorum', 'Brachioradialis'] },
        'Medial cord': { type: 'plexus', muscles: ['First dorsal interosseous', 'Abductor pollicis brevis', 'Flexor carpi ulnaris'] },
        'Lateral cord': { type: 'plexus', muscles: ['Biceps brachii', 'Brachialis', 'Pronator teres'] },
        'Median nerve at wrist (carpal tunnel)': { type: 'peripheral', muscles: ['Abductor pollicis brevis', 'Opponens pollicis'] },
        'Median nerve at forearm': { type: 'peripheral', muscles: ['Abductor pollicis brevis', 'Flexor pollicis longus', 'Pronator teres', 'Flexor carpi radialis'] },
        'Ulnar nerve at wrist (Guyon canal)': { type: 'peripheral', muscles: ['First dorsal interosseous', 'Abductor digiti minimi', 'Adductor pollicis'] },
        'Ulnar nerve at elbow': { type: 'peripheral', muscles: ['First dorsal interosseous', 'Flexor carpi ulnaris', 'Abductor digiti minimi'] },
        'Radial nerve in spiral groove': { type: 'peripheral', muscles: ['Triceps brachii', 'Brachioradialis', 'Extensor digitorum'] },
        'Posterior interosseous nerve': { type: 'peripheral', muscles: ['Extensor digitorum', 'Extensor pollicis longus'] },
        'Axillary nerve': { type: 'peripheral', muscles: ['Deltoid', 'Teres minor'] },
        'Suprascapular nerve': { type: 'peripheral', muscles: ['Supraspinatus', 'Infraspinatus'] }
    },
    LE: {
        'L2 nerve root': { type: 'root', muscles: ['Iliopsoas', 'Adductor longus', 'Sartorius'] },
        'L3 nerve root': { type: 'root', muscles: ['Rectus femoris', 'Vastus medialis', 'Adductor longus'] },
        'L4 nerve root': { type: 'root', muscles: ['Tibialis anterior', 'Rectus femoris', 'Vastus medialis'] },
        'L5 nerve root': { type: 'root', muscles: ['Extensor hallucis longus', 'Tibialis anterior', 'Gluteus medius', 'Biceps femoris'] },
        'S1 nerve root': { type: 'root', muscles: ['Gastrocnemius', 'Gluteus maximus', 'Biceps femoris'] },
        'Femoral nerve': { type: 'peripheral', muscles: ['Rectus femoris', 'Vastus medialis', 'Vastus lateralis', 'Sartorius'] },
        'Peroneal nerve at fibular head': { type: 'peripheral', muscles: ['Tibialis anterior', 'Extensor hallucis longus', 'Fibularis longus'] },
        'Deep peroneal nerve': { type: 'peripheral', muscles: ['Tibialis anterior', 'Extensor hallucis longus', 'Extensor digitorum longus'] },
        'Sciatic nerve': { type: 'peripheral', muscles: ['Biceps femoris', 'Semitendinosus', 'Gastrocnemius'] },
        'Tibial nerve': { type: 'peripheral', muscles: ['Gastrocnemius', 'Soleus', 'Flexor hallucis longus'] },
        'Superior gluteal nerve': { type: 'peripheral', muscles: ['Gluteus medius', 'Gluteus minimus', 'Tensor fasciae latae'] },
        'Inferior gluteal nerve': { type: 'peripheral', muscles: ['Gluteus maximus'] }
    }
};
