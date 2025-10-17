import { normalizeOperationsData, validateOperationsData, createPlanData, flows } from './matrixUtils'

// The 16 fundamental cognitive operations with complete descriptions
// Each operation is a combination of two base verbs: OBSERVE, ASK, REMEMBER, IMAGINE

const rawOperationsData = {
  rows: ['OBSERVE', 'ASK', 'REMEMBER', 'IMAGINE'],
  cols: ['OBSERVE', 'ASK', 'REMEMBER', 'IMAGINE'],

  operations: {
    'OBSERVE-OBSERVE': {
      name: 'WITNESS',
      description: 'Pure attention, direct perception',
      essence: 'You\'re not just looking—you\'re seeing without interpretation. Witnessing is observation at its purest, where you receive reality as it presents itself, without filtering through story or judgment.',
      inquiry: 'What if witnessing isn\'t passive—it\'s the most active thing you can do?',
      relatedPatterns: [1, 4, 7, 9],
      connectedOperations: ['INQUIRE', 'REFLECT', 'ENVISION'],
      mm4Example: {
        action: 'BE a friend first—listen, care, and love.',
        bridge: 'Pure attention to them—no agenda, just presence'
      },
      focusStatements: {
        inward: 'Notice what\'s happening inside you.',
        outward: 'See what\'s happening around you.',
        still: 'Let it all be seen—no label, no rush.'
      },
      lensExamples: {
        lds: 'Be fully present with ward members, seeing them as God sees them',
        psychological: 'Observe thoughts and feelings without judgment',
        ecological: 'Notice ecosystem patterns before intervening',
        therapeutic: 'Hold space for client without rushing to fix',
        philosophical: 'Attend to phenomena as they present themselves',
        ancestral: 'Witness the stories of those who came before',
        developmental: 'Notice where someone actually is, not where they "should" be',
        relational: 'See the other person clearly, not through projections',
        creative: 'Observe the raw material without imposing vision yet',
        mystical: 'Rest in pure awareness—witnessing consciousness itself',
        scientific: 'Careful observation before forming hypotheses',
        justice: 'See systemic patterns without defensiveness',
        contemplative: 'Simply be present—noticing breath, sensation'
      }
    },

    'OBSERVE-ASK': {
      name: 'INQUIRE',
      description: 'Looking with questions, investigative seeing',
      essence: 'You\'re not just looking—you\'re looking WITH questions. Inquiry is observation animated by curiosity. You\'re examining what you observe with genuine interest in understanding.',
      inquiry: 'What\'s beneath the boundaries I\'ve drawn?',
      relatedPatterns: [4, 6, 11],
      connectedOperations: ['WITNESS', 'EXAMINE', 'REFLECT'],
      mm4Example: {
        action: 'EXPAND your circle—include others and build connections. Nurture relationships.',
        bridge: 'Notice who\'s missing—question your boundaries'
      },
      focusStatements: {
        inward: 'Ask the Spirit, "What am I missing?"',
        outward: 'Ask others with honest curiosity.',
        still: 'Hold the question open; don\'t rush an answer.'
      },
      lensExamples: {
        lds: 'Ask "Who is not yet gathered?" Look for those at margins',
        psychological: 'Explore patterns with curiosity: "What\'s happening here?"',
        ecological: 'Investigate: "How does this relate to the whole?"',
        therapeutic: 'Gently question: "What does this want you to know?"',
        philosophical: 'Examine assumptions through Socratic questioning',
        ancestral: 'Ask ancestors: "What wisdom did you carry?"',
        developmental: 'Wonder: "What stage am I in now?"',
        relational: 'Get curious: "What\'s it like to be you?"',
        creative: 'Explore: "What if I tried this approach?"',
        mystical: 'Hold great questions: "Who am I really?"',
        scientific: 'Form questions from observations, generate hypotheses',
        justice: 'Ask "Whose voices are missing?"',
        contemplative: 'Notice with interest: "What is present now?"'
      }
    },

    'OBSERVE-REMEMBER': {
      name: 'REFLECT',
      description: 'Notice patterns across time',
      essence: 'You\'re seeing present circumstances in light of past experience. Reflection is observing with the dimension of time—recognizing patterns, cycles, and recurring themes across your history.',
      inquiry: 'What if the pattern you keep seeing isn\'t a problem—it\'s a teacher?',
      relatedPatterns: [1, 8, 10],
      connectedOperations: ['WITNESS', 'RECOGNIZE', 'INQUIRE'],
      mm4Example: {
        action: 'PRAY daily for a desire to share, and for promptings on how to help.',
        bridge: 'Notice patterns across time—what\'s the Spirit showing?'
      },
      focusStatements: {
        inward: 'See the patterns in your story.',
        outward: 'See the patterns in your people\'s story.',
        still: 'Stop naming—just notice the rhythm.'
      },
      lensExamples: {
        lds: 'Recognize patterns in your spiritual journey',
        psychological: 'Notice recurring patterns in relationships',
        ecological: 'See cycles and rhythms across seasons',
        therapeutic: 'Reflect on what keeps repeating in your life',
        philosophical: 'Connect present experience to studied wisdom',
        ancestral: 'See family patterns across generations',
        developmental: 'Notice growth patterns: "How have I changed?"',
        relational: 'Recognize relationship patterns that repeat',
        creative: 'Notice themes emerging in your work',
        mystical: 'Perceive the eternal in the temporary',
        scientific: 'Identify patterns across observations',
        justice: 'See historical patterns shaping current inequities',
        contemplative: 'Witness thoughts and patterns without attachment'
      }
    },

    'OBSERVE-IMAGINE': {
      name: 'ENVISION',
      description: 'See what could be, perceive possibility',
      essence: 'You\'re looking at what is and seeing what could be. Envisioning is observation plus imagination—the capacity to perceive potential hiding in present reality.',
      inquiry: 'What if the vision isn\'t something you create—it\'s something you notice?',
      relatedPatterns: [3, 11, 12],
      connectedOperations: ['WITNESS', 'DISCERN', 'WONDER'],
      mm4Example: {
        action: 'REACH OUT when the Spirit nudges—invite, serve, and testify.',
        bridge: 'See what could be—act on the vision'
      },
      focusStatements: {
        inward: 'Picture what could be within you.',
        outward: 'Imagine good you can do for others.',
        still: 'See without forcing; hold the picture lightly.'
      },
      lensExamples: {
        lds: 'See others as God sees them—their divine potential',
        psychological: 'Envision your integrated, whole self',
        ecological: 'Imagine the ecosystem restored to health',
        therapeutic: 'See the client\'s possibility beyond current pain',
        philosophical: 'Perceive the ideal—what wisdom calls toward',
        ancestral: 'Envision the future your ancestors dreamed of',
        developmental: 'See the next stage of growth calling you',
        relational: 'Imagine the relationship at its most connected',
        creative: 'See the finished work before you begin',
        mystical: 'Perceive what wants to be born through you',
        scientific: 'Imagine possible solutions or theories',
        justice: 'Envision the world we\'re building together',
        contemplative: 'Notice the potential in this present moment'
      }
    },

    'ASK-OBSERVE': {
      name: 'EXAMINE',
      description: 'Question what you\'re seeing',
      essence: 'You\'re bringing inquiry to observation. Examining is looking AT something while simultaneously asking questions ABOUT it. Where observation receives, examination investigates.',
      inquiry: 'What if examining isn\'t about finding what\'s wrong, but discovering what\'s actually there?',
      relatedPatterns: [4, 6, 11],
      connectedOperations: ['INQUIRE', 'DIALOGUE', 'LEARN'],
      mm4Example: {
        action: 'GO to the temple often—it gives you strength to face life.',
        bridge: 'Question what you\'re seeing—bring questions to sacred space'
      },
      focusStatements: {
        inward: 'Ask why you think or feel that way.',
        outward: 'Notice patterns in what\'s happening out there.',
        still: 'Wait before deciding; let truth settle.'
      },
      lensExamples: {
        lds: 'Bring your questions to sacred space—seek understanding',
        psychological: 'Question perceptions: "Is this actually true?"',
        ecological: 'Test your understanding of ecosystem dynamics',
        therapeutic: 'Gently challenge: "Is that the only way to see this?"',
        philosophical: 'Subject beliefs to critical examination',
        ancestral: 'Question what stories you\'ve been told',
        developmental: 'Examine whether you\'ve outgrown old frameworks',
        relational: 'Check assumptions: "Did I understand correctly?"',
        creative: 'Test your vision against reality',
        mystical: 'Question the nature of reality itself',
        scientific: 'Test hypotheses through experimentation',
        justice: 'Question who benefits from current arrangements',
        contemplative: 'Inquire into the nature of experience'
      }
    },

    'ASK-ASK': {
      name: 'DIALOGUE',
      description: 'Mutual inquiry, deepening questions',
      essence: 'You\'re in questions generating more questions. Dialogue is collaborative exploration where shared inquiry opens deeper understanding than either person could reach alone.',
      inquiry: 'What does commitment reveal about who I am?',
      relatedPatterns: [3, 6, 11],
      connectedOperations: ['EXAMINE', 'LEARN', 'WONDER'],
      mm4Example: {
        action: 'MAKE covenants and keep them—they bring God\'s power into your life.',
        bridge: 'Mutual inquiry with the Divine—sacred conversation'
      },
      focusStatements: {
        inward: 'Talk with God in your thoughts.',
        outward: 'Listen and share with real intent.',
        still: 'Let the silence speak too.'
      },
      lensExamples: {
        lds: 'Sacred conversation with God—covenant-making as dialogue',
        psychological: 'Engage in authentic mutual exploration',
        ecological: 'Co-investigate how systems interact',
        therapeutic: 'Therapist and client explore meaning together',
        philosophical: 'Socratic dialogue that opens deeper questions',
        ancestral: 'Converse across time with those who came before',
        developmental: 'Reflect with others on growth and becoming',
        relational: 'Build understanding through genuine back-and-forth',
        creative: 'Collaborate—questions sparking more questions',
        mystical: 'Prayer as two-way conversation with divine',
        scientific: 'Peer discourse that refines understanding',
        justice: 'Build solidarity through shared questioning',
        contemplative: 'Inner dialogue between different parts of self'
      }
    },

    'ASK-REMEMBER': {
      name: 'LEARN',
      description: 'Study what\'s been discovered',
      essence: 'You\'re bringing inquiry to accumulated knowledge. Learning is asking "What did others discover?" and integrating their findings with your own understanding.',
      inquiry: 'What if learning isn\'t absorbing information—it\'s recognizing what you already know?',
      relatedPatterns: [4, 8, 10],
      connectedOperations: ['DIALOGUE', 'RESEARCH', 'EXAMINE'],
      mm4Example: {
        action: 'TAKE your own family names—your ancestors are waiting for you.',
        bridge: 'Study what\'s been discovered—understand ancestors'
      },
      focusStatements: {
        inward: 'Let what you\'ve heard sink in.',
        outward: 'Learn from teachers and experience.',
        still: 'Sit with it until it lives in you.'
      },
      lensExamples: {
        lds: 'Study scriptures, understand ancestors\' lives',
        psychological: 'Learn from therapeutic literature and theory',
        ecological: 'Study ecosystem science and traditional knowledge',
        therapeutic: 'Learn from previous experiences and patterns',
        philosophical: 'Study great thinkers and traditions',
        ancestral: 'Research genealogy, learn family history',
        developmental: 'Study stages of human development',
        relational: 'Learn from relationship wisdom and experience',
        creative: 'Study the masters, learn techniques',
        mystical: 'Study sacred texts and mystical teachings',
        scientific: 'Review literature, build on prior research',
        justice: 'Study history of movements and organizing',
        contemplative: 'Learn from contemplative traditions'
      }
    },

    'ASK-IMAGINE': {
      name: 'WONDER',
      description: 'Questions that open future',
      essence: 'You\'re directing inquiry toward possibility. Wonder is asking "What if?" in a way that generates new potential rather than seeking known answers.',
      inquiry: 'What if wonder isn\'t childish—it\'s how consciousness evolves?',
      relatedPatterns: [8, 11, 12],
      connectedOperations: ['DIALOGUE', 'CO-CREATE', 'ENVISION'],
      mm4Example: {
        action: 'DO temple and family history work turns hearts and brings peace.',
        bridge: 'Questions that open future—What could this become?'
      },
      focusStatements: {
        inward: 'Ask, "How does God work in this?"',
        outward: 'Marvel at creation\'s beauty.',
        still: 'Stay amazed—no words needed.'
      },
      lensExamples: {
        lds: 'Wonder: "What if more souls could receive ordinances?"',
        psychological: 'Ask: "What if I\'m capable of more than I think?"',
        ecological: 'Wonder: "What if ecosystems could regenerate?"',
        therapeutic: 'Explore: "What if this pattern could shift?"',
        philosophical: 'Ponder: "What if there\'s another way to live?"',
        ancestral: 'Wonder: "What dreams did they have for us?"',
        developmental: 'Ask: "What am I becoming?"',
        relational: 'Imagine: "What if we tried connecting differently?"',
        creative: 'Wonder: "What if I broke this rule?"',
        mystical: 'Hold: "What if separation is illusion?"',
        scientific: 'Ask: "What if we approached this differently?"',
        justice: 'Wonder: "What if we built a different world?"',
        contemplative: 'Stay with: "What is this moment inviting?"'
      }
    },

    'REMEMBER-OBSERVE': {
      name: 'RECOGNIZE',
      description: 'See and acknowledge what was',
      essence: 'You\'re bringing present awareness to past reality. Recognition is seeing what has been and naming it clearly, making the invisible visible.',
      inquiry: 'What if recognition isn\'t about the past—it\'s about giving the past permission to be present?',
      relatedPatterns: [1, 3, 10],
      connectedOperations: ['REFLECT', 'RESEARCH', 'HONOR'],
      mm4Example: {
        action: 'CREATE a FamilySearch account for everyone 11 and older.',
        bridge: 'See and acknowledge what was—make it visible'
      },
      focusStatements: {
        inward: 'Remember what\'s shaped your heart.',
        outward: 'Acknowledge what shapes others.',
        still: 'Rest without naming—everything belongs.'
      },
      lensExamples: {
        lds: 'Acknowledge ancestors who lived and died—make them visible',
        psychological: 'Name and validate past experiences honestly',
        ecological: 'Acknowledge what has been lost or damaged',
        therapeutic: 'Witness and name what actually happened',
        philosophical: 'Acknowledge truths, even uncomfortable ones',
        ancestral: 'See and honor who came before',
        developmental: 'Acknowledge all stages you\'ve been through',
        relational: 'Name what\'s true in the relationship',
        creative: 'Acknowledge influences and inspirations',
        mystical: 'Recognize the sacred in all that has been',
        scientific: 'Document and verify what has been observed',
        justice: 'Name injustices—make the invisible visible',
        contemplative: 'Notice and acknowledge what\'s present'
      }
    },

    'REMEMBER-ASK': {
      name: 'RESEARCH',
      description: 'Seek to understand history',
      essence: 'You\'re bringing inquiry to the past. Research is investigating to understand what happened and why, seeking the story behind the story.',
      inquiry: 'What patterns are living in me?',
      relatedPatterns: [4, 8, 11],
      connectedOperations: ['RECOGNIZE', 'LEARN', 'HONOR'],
      mm4Example: {
        action: 'BUILD your 4-generation family tree to connect eternal links.',
        bridge: 'Seek to understand history—investigate your lineage'
      },
      focusStatements: {
        inward: 'Search memory and feeling for insight.',
        outward: 'Study and learn from the world\'s record.',
        still: 'Let understanding appear when it will.'
      },
      lensExamples: {
        lds: 'Research family history, build your tree',
        psychological: 'Investigate your personal history and patterns',
        ecological: 'Study ecological history—what was here before?',
        therapeutic: 'Explore the origins of current patterns',
        philosophical: 'Investigate intellectual history',
        ancestral: 'Research genealogy, seek ancestral stories',
        developmental: 'Study your own developmental history',
        relational: 'Understand the history of the relationship',
        creative: 'Research the history of your craft or medium',
        mystical: 'Study lineages and mystical traditions',
        scientific: 'Conduct historical research, review archives',
        justice: 'Investigate historical roots of injustice',
        contemplative: 'Inquire into your spiritual history'
      }
    },

    'REMEMBER-REMEMBER': {
      name: 'HONOR',
      description: 'Deep keeping, preservation',
      essence: 'You\'re holding sacred what has been. Honoring is maintaining continuity and reverence, keeping the thread unbroken across time.',
      inquiry: 'What if honoring the past isn\'t about looking backward—it\'s about making the future possible?',
      relatedPatterns: [1, 10, 12],
      connectedOperations: ['RECOGNIZE', 'RESEARCH', 'RECLAIM'],
      mm4Example: {
        action: 'LEARN how to find and submit names for the temple using Ordinances Ready.',
        bridge: 'Deep keeping, preservation—hold what matters'
      },
      focusStatements: {
        inward: 'Be thankful for what\'s sacred to you.',
        outward: 'Celebrate what\'s sacred in others.',
        still: 'Treat every moment as holy, just for a breath.'
      },
      lensExamples: {
        lds: 'Keep covenants, maintain traditions, remember promises',
        psychological: 'Honor all parts of yourself, even shadow',
        ecological: 'Preserve endangered species and habitats',
        therapeutic: 'Honor the client\'s timeline and pace',
        philosophical: 'Uphold principles even when difficult',
        ancestral: 'Keep traditions alive, honor those before',
        developmental: 'Honor each stage—nothing was wasted',
        relational: 'Keep commitments, maintain trust',
        creative: 'Preserve techniques and traditions in craft',
        mystical: 'Maintain sacred practices and lineages',
        scientific: 'Maintain rigorous standards and ethics',
        justice: 'Honor the dignity of all people',
        contemplative: 'Maintain regular practice with devotion'
      }
    },

    'REMEMBER-IMAGINE': {
      name: 'RECLAIM',
      description: 'Restore what was lost',
      essence: 'You\'re bringing forward what was forgotten or taken. Reclaiming is recovering lost wisdom, lost capacity, lost voice—making whole what was fragmented.',
      inquiry: 'What if what you\'re reclaiming was never really lost—just waiting to be remembered?',
      relatedPatterns: [8, 12],
      connectedOperations: ['HONOR', 'RENEW', 'RECOGNIZE'],
      mm4Example: {
        action: 'DISCOVER your story with help from a family history consultant. Feel the Spirit of Elijah.',
        bridge: 'Restore what was lost—bring it back to life'
      },
      focusStatements: {
        inward: 'Gather back what you\'ve forgotten of yourself.',
        outward: 'Mend what\'s been broken around you.',
        still: 'See that nothing is truly lost.'
      },
      lensExamples: {
        lds: 'Restore names, bring ancestors into the work',
        psychological: 'Reclaim disowned parts of self',
        ecological: 'Restore damaged ecosystems to health',
        therapeutic: 'Recover lost voice, reclaim agency',
        philosophical: 'Revive forgotten wisdom traditions',
        ancestral: 'Reclaim ancestral wisdom and practices',
        developmental: 'Reintegrate capacities you set aside',
        relational: 'Restore connection after rupture',
        creative: 'Revive old styles or bring back techniques',
        mystical: 'Remember your divine nature',
        scientific: 'Recover lost data or forgotten research',
        justice: 'Reclaim stolen land, rights, or dignity',
        contemplative: 'Restore awareness of original wholeness'
      }
    },

    'IMAGINE-OBSERVE': {
      name: 'DISCERN',
      description: 'See what wants to emerge',
      essence: 'You\'re perceiving nascent possibility. Discernment is sensing what is trying to be born, feeling the future pressing into the present.',
      inquiry: 'What if discernment isn\'t about choosing between options—it\'s about listening for what\'s already choosing you?',
      relatedPatterns: [5, 8, 11],
      connectedOperations: ['ENVISION', 'CO-CREATE', 'WONDER'],
      mm4Example: {
        action: 'GROW in faith, and strengthen your testimony.',
        bridge: 'See what wants to emerge—notice your becoming'
      },
      focusStatements: {
        inward: 'Sense what feels true inside.',
        outward: 'Watch what\'s ready to grow outside.',
        still: 'Be quiet; clarity comes on its own.'
      },
      lensExamples: {
        lds: 'Sense the Spirit\'s guidance—what is God calling you toward?',
        psychological: 'Notice what part of you is ready to emerge',
        ecological: 'Sense what the ecosystem is moving toward',
        therapeutic: 'Discern what wants to heal or integrate',
        philosophical: 'Sense what wisdom is emerging in this moment',
        ancestral: 'Feel what ancestors want you to carry forward',
        developmental: 'Notice the next stage trying to be born',
        relational: 'Sense what the relationship is calling for',
        creative: 'Feel what wants to be created through you',
        mystical: 'Perceive what is arising in consciousness',
        scientific: 'Notice patterns suggesting new theories',
        justice: 'Discern what movements are emerging',
        contemplative: 'Sense what is present beneath the surface'
      }
    },

    'IMAGINE-ASK': {
      name: 'CO-CREATE',
      description: 'Collaborative possibility-making',
      essence: 'You\'re building future together through shared imagination. Co-creation is the recognition that nothing meaningful comes into being alone—it\'s all partnership.',
      inquiry: 'Who am I becoming through loving?',
      relatedPatterns: [3, 6, 12],
      connectedOperations: ['WONDER', 'DIALOGUE', 'MANIFEST'],
      mm4Example: {
        action: 'CARE with Christ\'s love by being patient, kind, and forgiving.',
        bridge: 'Collaborative possibility-making—build together'
      },
      focusStatements: {
        inward: 'Ask what good God wants to make through you.',
        outward: 'Build with others in love and purpose.',
        still: 'Pause and notice—it\'s already forming.'
      },
      lensExamples: {
        lds: 'Build Zion together—unified in creating God\'s kingdom',
        psychological: 'Work with others to integrate and grow',
        ecological: 'Partner with nature in restoration',
        therapeutic: 'Client and therapist create healing together',
        philosophical: 'Build beloved community through dialogue',
        ancestral: 'Continue the work ancestors began',
        developmental: 'Grow alongside others in community',
        relational: 'Build the relationship together',
        creative: 'Collaborate on bringing vision to life',
        mystical: 'Partner with divine in manifestation',
        scientific: 'Collaborate in research and discovery',
        justice: 'Organize collectively for liberation',
        contemplative: 'Practice together in sangha or community'
      }
    },

    'IMAGINE-REMEMBER': {
      name: 'RENEW',
      description: 'Resurrect and refresh what was',
      essence: 'You\'re bringing old forms to new life. Renewal is reimagining tradition for present context, keeping the essence while refreshing the form.',
      inquiry: 'What if renewal isn\'t about making something new—it\'s about remembering what was always alive?',
      relatedPatterns: [8, 10, 12],
      connectedOperations: ['RECLAIM', 'CO-CREATE', 'MANIFEST'],
      mm4Example: {
        action: 'NOURISH unity at home through love, time, and understanding.',
        bridge: 'Resurrect what was—refresh and revive'
      },
      focusStatements: {
        inward: 'Let faith refill your heart.',
        outward: 'Bring new life to what you touch.',
        still: 'Rest—the newness is already rising.'
      },
      lensExamples: {
        lds: 'Renew covenants, refresh commitment, revive the work',
        psychological: 'Refresh perspective, renew energy for growth',
        ecological: 'Regenerate soil, revive waterways',
        therapeutic: 'Renew hope, refresh commitment to healing',
        philosophical: 'Renaissance—revive classical wisdom for today',
        ancestral: 'Revive traditions in contemporary context',
        developmental: 'Revisit old skills with new understanding',
        relational: 'Renew connection, refresh the bond',
        creative: 'Reimagine traditional forms in new ways',
        mystical: 'Refresh spiritual practice, renew devotion',
        scientific: 'Revisit old theories with new methods',
        justice: 'Revive movements, renew organizing energy',
        contemplative: 'Return to practice with fresh eyes'
      }
    },

    'IMAGINE-IMAGINE': {
      name: 'MANIFEST',
      description: 'Pure creation, actualization',
      essence: 'You\'re bringing vision fully into reality. Manifestation is the complete creative act from imagination to form, where potential becomes actual.',
      inquiry: 'What if manifestation isn\'t about making something happen—it\'s about allowing what\'s ready to emerge?',
      relatedPatterns: [8, 11, 12],
      connectedOperations: ['CO-CREATE', 'RENEW', 'DISCERN'],
      mm4Example: {
        action: 'UNITE with the Lord in His work of gathering Israel.',
        bridge: 'Pure creation, actualization—make it real'
      },
      focusStatements: {
        inward: 'Let conviction take shape inside.',
        outward: 'Act so others can see that light.',
        still: 'Be still; truth shines on its own.'
      },
      lensExamples: {
        lds: 'Gather Israel—actualize the vision of unity',
        psychological: 'Embody the integrated self you\'ve envisioned',
        ecological: 'Create thriving ecosystems',
        therapeutic: 'Actualize the healing you\'ve been working toward',
        philosophical: 'Live the wisdom—embody what you teach',
        ancestral: 'Become the ancestor your descendants will honor',
        developmental: 'Step fully into your next stage',
        relational: 'Create the connected relationship you envision',
        creative: 'Complete the work—bring vision fully into form',
        mystical: 'Embody enlightenment, be the change',
        scientific: 'Apply discoveries to create new technologies',
        justice: 'Build the world we long for—make it real',
        contemplative: 'Embody presence in daily life'
      }
    }
  }
}

export const operationsData = normalizeOperationsData(rawOperationsData)

const validationIssues = validateOperationsData(operationsData)
export const matrixValidationIssues = validationIssues

let isProduction = false

if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.MODE === 'production') {
  isProduction = true
}

if (!isProduction && typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production') {
  isProduction = true
}

if (validationIssues.length && !isProduction) {
  console.warn(
    'Matrix validation issues:\n' + validationIssues.map(issue => `• ${issue}`).join('\n')
  )
}

export const planData = createPlanData(operationsData)

export { flows }

export { boundaryCards } from './boundaryContent'
