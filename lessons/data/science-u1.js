/* Science · Unit 1: Fueling Athletes — 17 tasks (about 4 weeks). LS.5.1.1, LS.5.1.2.
   Anchoring phenomenon: Olympic athletes in action (a runner, a gymnast, a swimmer).
   To change words: edit the text inside the quotes. Keep the commas and brackets. */
(function () {
  var S1 = ['LS.5.1.1', 'Use models to recognize the organizational structure of humans as a multicellular organism (cell, tissue, organ, system, organism).'];
  var S2 = ['LS.5.1.2', 'Use models to compare the major systems of the human body (digestive, respiratory, circulatory, muscular, skeletal, nervous) as they relate to functions necessary for life.'];
  var SEPq = ['SEP', 'Asking questions'], SEPm = ['SEP', 'Developing and using models'];
  var PHEN = 'A sprinter runs 100 meters in under 10 seconds. A gymnast flips high above a balance beam. A swimmer races mile after mile. <b>What is happening inside their bodies that lets them do this?</b>';
  var NB = '../../notes/science-unit1.html', BODYLAB = '../../lab/body-systems.html';
  var ex = function (t, m) { return [t, 0, m]; };  // outline row: [part, minutes, what we do]

  LessonKit.unit({
    id: 'sci-u1', subject: 'science', short: 'Unit 1', title: 'Fueling Athletes', home: '../index.html', unitHref: '../unit1.html', word: 'Task',
    lessons: [
      /* ===================== Tasks 1–3: Launch the unit ===================== */
      {
        n: 1, section: 'Launch: The Anchoring Phenomenon', title: 'Athletes in Action', phenom: PHEN,
        goal: 'Let’s observe athletes in action and share what we notice and wonder.',
        stds: [S2, SEPq],
        targets: ['I can describe what I observe in the athlete videos.', 'I can ask questions about how the body works.'],
        vocab: [['observe', 'Notice details with your senses.'], ['phenomenon', 'Something that happens that we can observe and explain.']],
        outline: [ex('Engage', 'Watch videos of a sprinter, a gymnast and a swimmer.'), ex('Notice & Wonder', 'In your notebook, make a two-column chart: <b>I notice</b> / <b>I wonder</b>.'), ex('Share', 'Share with your group. Add classmates’ ideas in a different color.')],
        materials: ['Unit 1 slideshow (athlete videos)', 'Science notebook', 'Chart paper'],
        notes: [
          { t: 'p', html: '<p>Olympic athletes can do amazing things. Their bodies must work hard to run, flip and swim. This unit, we will figure out <b>how the human body works</b> so athletes can perform.</p>' },
          { t: 'write', q: '<b>I notice…</b> What do you see the athletes’ bodies doing?', ph: 'I notice the runner is breathing hard…' },
          { t: 'write', q: '<b>I wonder…</b> What questions do you have about what is happening inside their bodies?', ph: 'I wonder why…' },
          { t: 'tip', html: '<b>Good wonders</b> start with how, why or what: “How does the heart know to beat faster?”' }
        ],
        practice: [
          { type: 'sort', q: 'Sort each statement: is it a <b>notice</b> (an observation) or a <b>wonder</b> (a question)?', bins: ['I notice', 'I wonder'], items: [['The swimmer kicks her legs fast.', 0], ['The runner is sweating.', 0], ['The gymnast lands on her feet.', 0], ['Why does the runner breathe so hard?', 1], ['How do muscles get energy?', 1], ['What tells the legs to move?', 1]], hint: 'A wonder is a question. A notice is something you can see or hear.', why: 'Observations describe what you see. Wonders are questions to investigate.' },
          { q: 'Which is an <b>observation</b>?', choices: ['The gymnast’s arms are straight during the flip.', 'The gymnast is the best in the world.', 'I wonder how she flips.'], answer: 0, why: 'You can see that her arms are straight.' }
        ],
        exit: [
          { q: 'What is our unit question?', choices: ['What is happening inside athletes’ bodies that lets them perform?', 'Who is the fastest athlete?', 'Which sport is the best?'], answer: 0, why: 'We will explain how the body works so athletes can perform.' },
          { q: 'Which is a good <b>wonder</b> question?', choices: ['How does the heart pump blood to the legs?', 'The runner is fast.', 'Swimming is fun.'], answer: 0, why: 'It is a question we can investigate.' }
        ]
      },
      {
        n: 2, section: 'Launch: The Anchoring Phenomenon', title: 'Initial Model', phenom: PHEN,
        goal: 'Let’s draw our first model of what happens inside an athlete’s body.',
        stds: [S2, SEPm],
        targets: ['I can draw a model that shows my ideas right now.', 'I can label my model.'],
        vocab: [['model', 'A drawing or object that shows how something works.'], ['initial model', 'Your first model, before you learn more.']],
        outline: [ex('Review', 'Read your notice and wonder chart.'), ex('Model', 'Silently draw an athlete in action. Show what you think is happening <b>inside</b> the body. Add labels.'), ex('Share', 'Share with a partner. What is the same? What is different?')],
        materials: ['Science notebook', 'Pencils and colored pencils'],
        notes: [
          { t: 'p', html: '<p>Scientists make <b>models</b> to show their ideas. Your first model is called an <b>initial model</b>. It is OK if it is simple or not all correct! You will add to it all unit long.</p>' },
          { t: 'key', label: 'A good model', html: '<ul style="margin:0"><li>shows the athlete in action</li><li>shows what you think is happening <b>inside</b> the body</li><li>has <b>labels</b> and arrows</li><li>has a title</li></ul>' }
        ],
        practice: [
          { q: 'Why is it OK if your initial model has mistakes?', choices: ['Because we will add to it and change it as we learn', 'Because models don’t matter', 'Because the teacher will fix it'], answer: 0, why: 'Our ideas change and grow with evidence.' },
          { q: 'What should you add to your model to help others understand it?', choices: ['Labels and arrows', 'Glitter', 'Nothing'], answer: 0, why: 'Labels and arrows explain your ideas.' }
        ],
        lab: { type: 'sketch', title: 'My Initial Model', lead: 'Draw what you think is happening inside the athlete.', intro: 'Draw an athlete running, flipping or swimming. Show what you think is happening <b>inside</b> their body. Use the <b>Label</b> tool.', checklist: ['I drew an athlete in action.', 'I showed what I think happens inside the body.', 'I added at least 3 labels.', 'I gave my model a title.'] },
        exit: [
          { q: 'What is a model?', choices: ['A drawing or object that shows how something works', 'A famous athlete', 'A test'], answer: 0, why: 'Models show our ideas about how things work.' }
        ]
      },
      {
        n: 3, section: 'Launch: The Anchoring Phenomenon', title: 'Driving Question Board', phenom: PHEN,
        goal: 'Let’s ask questions and organize them into a Driving Question Board.',
        stds: [S2, SEPq],
        targets: ['I can write questions about the phenomenon.', 'I can help group our class questions.'],
        vocab: [['Driving Question Board (DQB)', 'A chart of our class questions that guides the unit.']],
        outline: [ex('Write', 'Write one question per sticky note.'), ex('Scientists Circle', 'Read your question aloud. If it is like another one, put it next to it.'), ex('Organize', 'Group the questions and give each group a name.')],
        materials: ['Chart paper: “What allows the athletes to perform well?”', 'Sticky notes', 'Markers'],
        notes: [
          { t: 'p', html: '<p>Our <b>Driving Question</b> is: <b>What allows the athletes to perform well?</b> Your questions will guide what we investigate.</p>' },
          { t: 'write', q: 'Write 3 questions you have about how the athletes’ bodies work.', rows: 4, ph: '1. How…\n2. Why…\n3. What…' }
        ],
        practice: [
          { type: 'sort', q: 'Group these questions by the body part they are about.', bins: ['Heart and blood', 'Lungs and breathing', 'Bones and muscles'], items: [['Why does the heart beat faster when you run?', 0], ['Where does blood go?', 0], ['Why do you breathe hard after a race?', 1], ['How much air do lungs hold?', 1], ['How do muscles move bones?', 2], ['Why don’t bones break when gymnasts land?', 2]], why: 'Grouping questions helps us plan what to investigate.' }
        ],
        exit: [
          { q: 'What is a Driving Question Board for?', choices: ['To keep our questions and guide what we learn', 'To list the answers', 'To grade our work'], answer: 0, why: 'The DQB guides our investigations.' }
        ]
      },

      /* ===================== Tasks 4–6: LS.5.1.1 ===================== */
      {
        n: 4, section: 'Part 1: How the Body Is Organized (LS.5.1.1)', title: 'The Hierarchy of the Human Body', when: '2 days', phenom: PHEN,
        goal: 'Let’s describe how living things are built from cells, tissues, organs and systems.',
        stds: [S1],
        targets: ['I can explain that multicellular organisms are made of many cells.', 'I can put the levels in order: cell → tissue → organ → system → organism.'],
        vocab: [['cell', 'The smallest living part of an organism.'], ['tissue', 'A group of the same kind of cells doing one job.'], ['organ', 'Different tissues working together.'], ['organ system', 'Organs working together on a big job.'], ['organism', 'A whole living thing.'], ['multicellular', 'Made of many cells.']],
        outline: [ex('Engage', 'What do you think makes up our muscles?'), ex('Explore', 'Observe a celery stalk. Cut it and look at the tubes. Look at celery cells under a microscope (optional).'), ex('Explain', 'Build the hierarchy: cell → tissue → organ → organ system → organism.'), ex('Evaluate', 'Order the levels and give an example of each.')],
        materials: ['Celery stalks (one per group)', 'Plastic knives', 'Optional: microscope and prepared celery slides', 'Science notebook', { t: 'Unit 1 notebook (Lesson 1: Built from Cells)', href: NB }],
        notes: [
          { t: 'p', html: '<p>All living things are made of <b>cells</b>. A celery plant and a human athlete are both <b>multicellular</b>: made of many cells. Cells team up to make bigger and bigger parts.</p>' },
          { t: 'fig', table: { caption: 'Levels of organization', head: ['Level', 'What it is', 'Example in a runner'], leftCol: true, rows: [['Cell', 'smallest living part', 'one muscle cell'], ['Tissue', 'same cells doing one job', 'muscle tissue'], ['Organ', 'tissues working together', 'the heart'], ['Organ system', 'organs working together', 'circulatory system'], ['Organism', 'the whole living thing', 'the runner']] } },
          { t: 'fill', html: 'Cells make up [[tissues|tissue]]. Tissues make up [[organs|organ]]. Organs make up organ [[systems|system]]. Systems make up the whole [[organism]].' },
          { t: 'tip', html: '<b>Memory trick:</b> “<b>C</b>ool <b>T</b>eams <b>O</b>ften <b>S</b>core <b>O</b>ften” → Cell, Tissue, Organ, System, Organism.' }
        ],
        practice: [
          { type: 'sort', q: 'Sort each example into its level.', bins: ['Cell', 'Tissue', 'Organ', 'Organ system'], items: [['one red blood cell', 0], ['one nerve cell', 0], ['muscle tissue', 1], ['bone tissue', 1], ['heart', 2], ['stomach', 2], ['digestive system', 3], ['respiratory system', 3]], hint: 'Is it one cell, a group of the same cells, a body part, or a team of body parts?', why: 'Cells → tissues → organs → systems.' },
          { q: 'Which list is in order from <b>smallest</b> to <b>largest</b>?', choices: ['cell, tissue, organ, organ system, organism', 'organ, cell, tissue, organism, organ system', 'tissue, cell, organ, organism, organ system'], answer: 0, why: 'Cells build tissues, tissues build organs, organs build systems, and systems build the organism.' },
          { q: 'What does <b>multicellular</b> mean?', choices: ['Made of many cells', 'Made of one cell', 'Made of no cells'], answer: 0, why: '“Multi” means many.' },
          { q: 'The heart is made of muscle tissue and other tissues. The heart is an…', choices: ['organ', 'cell', 'organism'], answer: 0, why: 'Different tissues working together make an organ.' }
        ],
        lab: { type: 'sort', title: 'Build the Hierarchy', lead: 'Sort the parts of an athlete’s body.', intro: 'Each card is one part of a swimmer’s body. Sort it into the right level.', bins: ['Cell', 'Tissue', 'Organ', 'Organ system', 'Organism'], items: [['a muscle cell', 0], ['a skin cell', 0], ['muscle tissue', 1], ['lung tissue', 1], ['lungs', 2], ['brain', 2], ['respiratory system', 3], ['nervous system', 3], ['the swimmer', 4]], success: 'From one tiny cell all the way up to the athlete!' },
        exit: [
          { q: 'What is the smallest living part of the body?', choices: ['A cell', 'A tissue', 'An organ'], answer: 0, why: 'Cells are the building blocks of life.' },
          { q: 'A group of the same kind of cells doing one job is a…', choices: ['tissue', 'organ', 'system'], answer: 0, why: 'That is the definition of tissue.' },
          { q: 'The stomach, intestines and esophagus work together. They make an…', choices: ['organ system', 'cell', 'tissue'], answer: 0, why: 'Organs working together make an organ system (the digestive system).' }
        ]
      },
      {
        n: 5, section: 'Part 1: How the Body Is Organized (LS.5.1.1)', title: 'MultiBRICKular Organisms', phenom: PHEN,
        goal: 'Let’s build a model of how the parts of the body fit together.',
        stds: [S1, SEPm],
        targets: ['I can build a model that shows cells, tissues, organs and systems.', 'I can explain how my model shows the hierarchy.'],
        vocab: [['model', 'Something that shows how a thing works.'], ['structure', 'A part, and how it is built.'], ['function', 'The job a part does.']],
        outline: [ex('Engage', 'Notice & Wonder: a picture of the levels inside the respiratory system.'), ex('Explore', 'Use building bricks: one brick = one cell. Build a tissue, an organ, and a system.'), ex('Explain', 'How is your brick model like a real body? How is it different?')],
        materials: ['A bag of building bricks for each group', 'Science notebook'],
        notes: [
          { t: 'p', html: '<p>In our brick model, <b>one brick = one cell</b>. Many bricks of the same color stuck together = a <b>tissue</b>. Different tissues together = an <b>organ</b>. Organs together = a <b>system</b>.</p>' },
          { t: 'reveal', q: 'How is a brick model <b>different</b> from a real body?', a: 'Real cells are alive. They grow, use energy and make new cells. Bricks don’t! Every model has limits.' },
          { t: 'write', q: 'Explain your brick model. What did each part stand for?', ph: 'One brick stood for… A group of bricks stood for…' }
        ],
        practice: [
          { q: 'In the brick model, one brick stands for a…', choices: ['cell', 'organ', 'system'], answer: 0, why: 'The smallest piece stands for the smallest living part.' },
          { q: 'You stick 10 red bricks together to do one job. What does that model?', choices: ['A tissue', 'An organism', 'A cell'], answer: 0, why: 'Same cells working together = tissue.' },
          { q: 'What is one <b>limit</b> of the brick model?', choices: ['Bricks are not alive.', 'Bricks have colors.', 'Bricks are small.'], answer: 0, why: 'Real cells are living.' }
        ],
        lab: { type: 'link', title: 'Body Systems Lab, Part 1', intro: 'Open the Body Systems Lab. In <b>Part 1</b>, tap the cards in order from smallest to largest.', href: BODYLAB, btn: 'Open the Body Systems Lab' },
        exit: [
          { q: 'Which is the right order?', choices: ['cell → tissue → organ → system → organism', 'organism → cell → organ → tissue → system'], answer: 0, why: 'Small parts build bigger parts.' },
          { q: 'Why do scientists use models?', choices: ['To show how something works', 'Because they are toys', 'To skip learning'], answer: 0, why: 'Models help us explain ideas.' }
        ]
      },
      {
        n: 6, section: 'Part 1: How the Body Is Organized (LS.5.1.1)', title: 'Human Body Basics', phenom: PHEN,
        goal: 'Let’s explain in writing how the human body is organized.',
        stds: [S1],
        targets: ['I can explain in writing how the body is organized.', 'I can update my model with new ideas.'],
        vocab: [['organism', 'A whole living thing.'], ['explain', 'Tell how or why, using evidence.']],
        outline: [ex('Engage', 'Revisit the DQB. Which questions can we answer now?'), ex('Explore', 'Human Body Basics probe.'), ex('Compare & Connect', 'Make a group model of how the body is organized. Compare with other groups.'), ex('Evaluate', 'Update your own model. Write an explanation.')],
        materials: ['Human Body Basics probe', 'Large whiteboard or chart paper for each group', 'Science notebook'],
        notes: [
          { t: 'key', label: 'Explain it', html: '<p style="margin:0">An athlete is an <b>organism</b> made of many <b>cells</b>. Cells form <b>tissues</b>, tissues form <b>organs</b>, and organs form <b>organ systems</b>. The systems work together so the athlete can move, breathe and stay alive.</p>' },
          { t: 'write', q: 'Explain how a runner’s body is organized. Use the words cell, tissue, organ, system and organism.', rows: 5, ph: 'A runner is made of…' }
        ],
        practice: [
          { q: 'Which sentence is <b>correct</b>?', choices: ['Organs are made of tissues.', 'Cells are made of organs.', 'Tissues are made of systems.'], answer: 0, why: 'Tissues build organs.' },
          { q: 'Which is an organism?', choices: ['A swimmer', 'A lung', 'A blood cell'], answer: 0, why: 'An organism is a whole living thing.' },
          { q: 'The lungs, trachea and nose work together. What do they form?', choices: ['The respiratory system', 'A tissue', 'A cell'], answer: 0, why: 'Organs working together form a system.' }
        ],
        exit: [
          { q: 'Put in order from smallest to largest: organ, cell, system, tissue.', choices: ['cell, tissue, organ, system', 'tissue, cell, system, organ', 'organ, system, cell, tissue'], answer: 0, why: 'Cell → tissue → organ → system.' },
          { q: 'Muscle cells group together to form…', choices: ['muscle tissue', 'the brain', 'an organism'], answer: 0, why: 'Same cells together = tissue.' }
        ]
      },

      /* ===================== Tasks 7–16: LS.5.1.2 ===================== */
      {
        n: 7, section: 'Part 2: The Body Systems (LS.5.1.2)', title: 'The Ballad of a Boneless Chicken', when: '2 days', phenom: PHEN,
        goal: 'Let’s explain the structures and functions of the skeletal system.',
        stds: [S2],
        targets: ['I can name the main structure of the skeletal system: bones.', 'I can explain that the skeleton gives the body structure, support and protection.'],
        vocab: [['skeletal system', 'All the bones in the body.'], ['support', 'Hold the body up.'], ['protect', 'Keep organs safe.'], ['joint', 'A place where two bones meet.']],
        outline: [ex('Engage', 'What would happen to a chicken (or an athlete) with no bones?'), ex('Explore', 'Soak a clean chicken bone in vinegar for several days. What happens? (The bone becomes bendy.)'), ex('Explain', 'Label a skeletal system diagram. What does each part protect or support?'), ex('Evaluate', 'Exit ticket.')],
        materials: ['Ballad of a Boneless Chicken handout', 'Skeletal system diagram and notes', 'Optional: a clean chicken bone, a jar, vinegar'],
        notes: [
          { t: 'p', html: '<p>Your <b>skeletal system</b> is made of <b>bones</b>. An adult has 206 bones! Bones are strong and hard because they contain minerals like <b>calcium</b>. When a chicken bone soaks in vinegar, the vinegar removes calcium and the bone gets bendy.</p>' },
          { t: 'key', label: 'Jobs of the skeleton', html: '<ul style="margin:0"><li><b>Structure &amp; support:</b> holds the body up and gives it shape</li><li><b>Protection:</b> the skull protects the brain; the ribs protect the heart and lungs</li><li><b>Movement:</b> bones meet at <b>joints</b>, and muscles pull on bones to move them</li></ul>' },
          { t: 'fill', html: 'The skeletal system is made of [[bones|bone]]. The [[skull]] protects the brain. The [[ribs|rib cage|ribcage]] protect the heart and lungs. A place where two bones meet is a [[joint]].' },
          { t: 'reveal', q: 'Why does a gymnast need strong bones?', a: 'Her bones support her body and take the force when she lands. Without strong bones she couldn’t hold her shape or land safely.' }
        ],
        practice: [
          { q: 'What is the main structure of the skeletal system?', choices: ['Bones', 'Muscles', 'Nerves'], answer: 0, why: 'The skeletal system is made of bones.' },
          { q: 'Which bones protect the heart and lungs?', choices: ['The ribs', 'The skull', 'The leg bones'], answer: 0, why: 'The rib cage surrounds the heart and lungs.' },
          { type: 'multi', q: 'Choose <b>all</b> the jobs of the skeletal system.', choices: ['Support the body', 'Protect organs', 'Help the body move', 'Digest food'], answer: [0, 1, 2], why: 'Digestion is the digestive system’s job.' },
          { q: 'A chicken bone soaked in vinegar becomes bendy. What was removed?', choices: ['Calcium (minerals)', 'Water', 'Muscle'], answer: 0, why: 'Vinegar dissolves the calcium that makes bones hard.' }
        ],
        exit: [
          { q: 'What does the skull protect?', choices: ['The brain', 'The stomach', 'The lungs'], answer: 0, why: 'The skull is a helmet for the brain.' },
          { q: 'What gives the body its shape and holds it up?', choices: ['The skeletal system', 'The digestive system', 'The respiratory system'], answer: 0, why: 'Bones provide structure and support.' },
          { q: 'A place where two bones meet is a…', choices: ['joint', 'tissue', 'vessel'], answer: 0, why: 'Knees, elbows and shoulders are joints.' }
        ]
      },
      {
        n: 8, section: 'Part 2: The Body Systems (LS.5.1.2)', title: 'In the Blink of an Eye', when: '2 days', phenom: PHEN,
        goal: 'Let’s explain the structures and functions of the muscular system.',
        stds: [S2],
        targets: ['I can explain that muscles let the body move.', 'I can tell voluntary muscles from involuntary muscles.'],
        vocab: [['muscular system', 'All the muscles in the body.'], ['voluntary muscle', 'A muscle you control, like your leg muscles.'], ['involuntary muscle', 'A muscle that works on its own, like your heart.']],
        outline: [ex('Engage', 'Try not to blink for 30 seconds! Why is it so hard?'), ex('Explore', 'Muscle sort: voluntary or involuntary?'), ex('Explain', 'Muscular system notes.'), ex('Evaluate', 'Exit ticket.')],
        materials: ['Muscle sort cards (one set per group)', 'Muscular system notes', 'Timer'],
        notes: [
          { t: 'p', html: '<p>Your body has more than <b>600 muscles</b>. Muscles let your body <b>move</b>: they move your bones, pump your blood, and push food through your body.</p>' },
          { t: 'vocab', words: [['Voluntary muscle', 'A muscle you choose to move.', 'Leg muscles when you kick a ball'], ['Involuntary muscle', 'A muscle that works without you thinking about it.', 'Your heart beating; your stomach churning'], ['Heart muscle', 'A special involuntary muscle that never stops pumping.']] },
          { t: 'fill', html: 'The job of the muscular system is to help the body [[move|movement]]. Muscles I control are [[voluntary]]. Muscles that work on their own, like the heart, are [[involuntary]].' },
          { t: 'tip', html: '<b>Blinking</b> is mostly involuntary — you blink thousands of times a day without thinking. But you can also blink on purpose!' }
        ],
        practice: [
          { type: 'sort', q: 'Sort each action: voluntary or involuntary?', bins: ['Voluntary (I control it)', 'Involuntary (it happens on its own)'], items: [['kicking a ball', 0], ['waving hello', 0], ['swimming a stroke', 0], ['heart beating', 1], ['stomach churning food', 1], ['food moving through the intestines', 1]], why: 'You choose to kick, wave and swim. Your heart and digestive muscles work on their own.' },
          { q: 'What is the main function of the muscular system?', choices: ['Movement', 'Protection of the brain', 'Breathing in oxygen'], answer: 0, why: 'Muscles make the body move.' },
          { q: 'Which muscle is involuntary?', choices: ['The heart', 'The biceps', 'The leg muscles'], answer: 0, why: 'Your heart beats without you telling it to.' }
        ],
        lab: { type: 'sort', title: 'Muscle Sort', lead: 'What do an athlete’s muscles do?', intro: 'Sort what happens in a sprinter’s body during a race.', bins: ['Voluntary muscles', 'Involuntary muscles'], items: [['legs push off the starting block', 0], ['arms pump back and forth', 0], ['heart beats faster', 1], ['muscles around the lungs help breathing (even while asleep)', 1], ['head turns to look at the finish line', 0], ['stomach muscles digest breakfast', 1]], success: 'Both kinds of muscles help the athlete.' },
        exit: [
          { q: 'Which is a <b>voluntary</b> action?', choices: ['Raising your hand', 'Your heart beating', 'Your stomach digesting'], answer: 0, why: 'You choose to raise your hand.' },
          { q: 'What does the muscular system let the body do?', choices: ['Move', 'See', 'Think'], answer: 0, why: 'Movement is the muscular system’s job.' },
          { q: 'About how many muscles are in the human body?', choices: ['More than 600', 'About 20', 'About 10,000,000'], answer: 0, why: 'There are more than 600 muscles.' }
        ]
      },
      {
        n: 9, section: 'Part 2: The Body Systems (LS.5.1.2)', title: 'How’s Your Posture?', phenom: PHEN,
        goal: 'Let’s explain how the skeletal and muscular systems work together.',
        stds: [S2, SEPm],
        targets: ['I can explain that muscles pull on bones to make them move.', 'I can build a model of a joint.'],
        vocab: [['tendon', 'A strong cord that connects a muscle to a bone.'], ['contract', 'When a muscle gets shorter and pulls.'], ['relax', 'When a muscle gets longer and lets go.']],
        outline: [ex('Engage', 'Draw your arm bending. What do you think makes it bend?'), ex('Explore', 'Build an arm model with wooden sticks (bones), tape, glue and rubber bands (muscles).'), ex('Explain', 'Muscles can only <b>pull</b>, not push. That is why they work in pairs.')],
        materials: ['Coffee stirrers or wooden sticks', 'Tape, glue, rubber bands', 'Science notebook'],
        notes: [
          { t: 'p', html: '<p>Muscles are attached to bones by <b>tendons</b>. When a muscle <b>contracts</b> (gets shorter), it <b>pulls</b> on the bone and the bone moves at a <b>joint</b>.</p>' },
          { t: 'key', label: 'Muscles work in pairs', html: '<p style="margin:0">Muscles can only <b>pull</b>. To bend your arm, the <b>biceps</b> (front) contracts. To straighten it, the <b>triceps</b> (back) contracts while the biceps relaxes.</p>' },
          { t: 'fill', html: 'Muscles are connected to bones by [[tendons|tendon]]. A muscle can only [[pull]], so muscles work in [[pairs|pair]].' }
        ],
        practice: [
          { q: 'How do muscles move bones?', choices: ['They contract and pull on the bones.', 'They push the bones.', 'Bones move by themselves.'], answer: 0, why: 'Muscles can only pull.' },
          { q: 'What connects a muscle to a bone?', choices: ['A tendon', 'A nerve', 'A vessel'], answer: 0, why: 'Tendons attach muscles to bones.' },
          { q: 'You bend your elbow. Which muscle contracts?', choices: ['Biceps (front of the upper arm)', 'Triceps (back of the upper arm)', 'Heart'], answer: 0, why: 'The biceps pulls the lower arm up.' },
          { q: 'Why do the skeletal and muscular systems need each other?', choices: ['Bones give support; muscles pull bones to move.', 'They don’t need each other.', 'Muscles protect bones.'], answer: 0, why: 'Together they make movement possible.' }
        ],
        exit: [
          { q: 'When a muscle contracts, it gets…', choices: ['shorter and pulls', 'longer and pushes'], answer: 0, why: 'Contract = shorten and pull.' },
          { q: 'Why do muscles work in pairs?', choices: ['Because a muscle can only pull, not push', 'Because they are lonely', 'Because bones push them'], answer: 0, why: 'One muscle pulls one way; its partner pulls the other way.' }
        ]
      },
      {
        n: 10, section: 'Part 2: The Body Systems (LS.5.1.2)', title: 'The Respiratory System', phenom: PHEN,
        goal: 'Let’s explain the structures and functions of the respiratory system.',
        stds: [S2],
        targets: ['I can name the main structures: nose, trachea and lungs.', 'I can explain that we breathe in oxygen and breathe out carbon dioxide.'],
        vocab: [['respiratory system', 'The organs that help you breathe.'], ['trachea', 'The windpipe: a tube that carries air to the lungs.'], ['lungs', 'Organs where oxygen goes into the blood.'], ['oxygen', 'A gas your cells need.'], ['carbon dioxide', 'A waste gas you breathe out.'], ['diaphragm', 'A muscle under the lungs that helps you breathe.']],
        outline: [ex('Engage', 'Why do swimmers take a big breath before they go under?'), ex('Explore', 'Read The Respiratory System text. Label a diagram.'), ex('Explain', 'Trace the path of air: nose → trachea → lungs.'), ex('Elaborate', 'Respiratory system drag-and-drop or Study Jam video.')],
        materials: ['The Respiratory System text (CK-12)', 'Respiratory system diagram', 'Human Body science journal notes'],
        notes: [
          { t: 'p', html: '<p>Every cell in your body needs <b>oxygen</b>. The <b>respiratory system</b> brings oxygen in and takes <b>carbon dioxide</b> (a waste gas) out. This is called <b>gas exchange</b>.</p>' },
          { t: 'example', title: 'The path of air', steps: ['Air comes in through your <b>nose</b> (or mouth).', 'It travels down the <b>trachea</b> (windpipe).', 'It goes into the <b>lungs</b>.', 'In the lungs, <b>oxygen</b> moves into the blood. <b>Carbon dioxide</b> moves out of the blood.', 'You breathe out the carbon dioxide.'] },
          { t: 'fill', html: 'Air travels from the nose to the [[trachea|windpipe]] to the [[lungs|lung]]. We breathe in [[oxygen]] and breathe out [[carbon dioxide]].' }
        ],
        practice: [
          { q: 'Put the path of air in order.', choices: ['nose → trachea → lungs', 'lungs → nose → trachea', 'trachea → lungs → nose'], answer: 0, why: 'Air comes in the nose, down the trachea, into the lungs.' },
          { q: 'What gas do your cells need?', choices: ['Oxygen', 'Carbon dioxide', 'Helium'], answer: 0, why: 'Cells use oxygen to get energy from food.' },
          { q: 'What gas do you breathe <b>out</b>?', choices: ['Carbon dioxide', 'Oxygen only', 'Nitrogen only'], answer: 0, why: 'Carbon dioxide is a waste gas.' },
          { q: 'Why does a runner breathe faster during a race?', choices: ['Working muscles need more oxygen.', 'The lungs are getting smaller.', 'The runner is cold.'], answer: 0, why: 'More work = more oxygen needed.' }
        ],
        lab: { type: 'pulse', what: 'breaths', title: 'Breathing Rate Lab', lead: 'Does exercise change how fast you breathe?', intro: 'Sit still. Press Start and count your breaths for 15 seconds. Record. Then do 1 minute of jumping jacks and count again.' },
        exit: [
          { q: 'What is the function of the respiratory system?', choices: ['Bring in oxygen and remove carbon dioxide', 'Pump blood', 'Break down food'], answer: 0, why: 'Gas exchange.' },
          { q: 'Which is <b>not</b> part of the respiratory system?', choices: ['Stomach', 'Lungs', 'Trachea'], answer: 0, why: 'The stomach is part of the digestive system.' },
          { q: 'Where does oxygen move into the blood?', choices: ['In the lungs', 'In the nose', 'In the stomach'], answer: 0, why: 'Gas exchange happens in the lungs.' }
        ]
      },
      {
        n: 11, section: 'Part 2: The Body Systems (LS.5.1.2)', title: 'Heartbeats', phenom: PHEN,
        goal: 'Let’s explain the structures and functions of the circulatory system.',
        stds: [S2],
        targets: ['I can name the main structures: heart, blood and blood vessels.', 'I can explain that the circulatory system moves blood with oxygen and nutrients to the body and carries away waste.'],
        vocab: [['circulatory system', 'The heart, blood and blood vessels.'], ['heart', 'A muscle that pumps blood.'], ['blood vessels', 'Tubes that carry blood (arteries, veins, capillaries).'], ['pulse', 'The beat you feel when your heart pumps.'], ['nutrients', 'The useful parts of food your cells need.']],
        outline: [ex('Engage', 'Feel your pulse on your wrist or neck. What is it?'), ex('Explore', 'Count your heartbeats for 15 seconds. Multiply by 4.'), ex('Explain', 'The heart pumps blood through blood vessels to every cell.'), ex('Evaluate', 'Make connections in your notes.')],
        materials: ['Timer', 'Human Body science journal notes', 'Optional: Circulatory System Gizmo task cards'],
        notes: [
          { t: 'p', html: '<p>Your <b>heart</b> is a muscle about the size of your fist. It pumps <b>blood</b> through <b>blood vessels</b> to every part of your body — about 100,000 times a day!</p>' },
          { t: 'key', label: 'What blood carries', html: '<ul style="margin:0"><li><b>Delivers:</b> oxygen (from the lungs) and nutrients (from food) to the cells</li><li><b>Removes:</b> waste, like carbon dioxide, from the cells</li></ul>' },
          { t: 'fill', html: 'The main parts of the circulatory system are the [[heart]], blood, and blood [[vessels|vessel]]. Blood carries [[oxygen]] and nutrients to the cells.' },
          { t: 'tip', html: '<b>Math connection:</b> To find beats per minute, count for 15 seconds and multiply by 4, because 15 × 4 = 60 seconds.' }
        ],
        practice: [
          { q: 'What does the heart do?', choices: ['Pumps blood through the body', 'Breathes in air', 'Digests food'], answer: 0, why: 'The heart is a pump.' },
          { q: 'You count 20 heartbeats in 15 seconds. How many beats per minute?', answer: 80, unit: 'beats per minute', hint: 'There are four 15-second parts in a minute. 20 × 4.', why: '20 × 4 = 80.' },
          { q: 'What does blood deliver to cells?', choices: ['Oxygen and nutrients', 'Carbon dioxide only', 'Bones'], answer: 0, why: 'Blood delivers oxygen and nutrients and carries away waste.' },
          { q: 'Which are the main structures of the circulatory system?', choices: ['Heart, blood, blood vessels', 'Brain, spinal cord, nerves', 'Mouth, stomach, intestines'], answer: 0, why: 'The other two are the nervous and digestive systems.' }
        ],
        lab: { type: 'pulse', what: 'heartbeats', title: 'Heart Rate Lab', lead: 'Measure your heart rate.', intro: 'Put two fingers on your wrist or the side of your neck. Press Start and count beats for 15 seconds. Record. Then do 1 minute of jumping jacks and measure again.' },
        exit: [
          { q: 'Your pulse is 18 beats in 15 seconds. What is your heart rate per minute?', answer: 72, unit: 'beats per minute', why: '18 × 4 = 72.' },
          { q: 'What carries blood around the body?', choices: ['Blood vessels', 'Nerves', 'Tendons'], answer: 0, why: 'Arteries, veins and capillaries are blood vessels.' },
          { q: 'Why does an athlete’s heart beat faster during a race?', choices: ['To deliver more oxygen to working muscles', 'Because the heart is tired', 'To digest food faster'], answer: 0, why: 'Muscles need more oxygen when they work hard.' }
        ]
      },
      {
        n: 12, section: 'Part 2: The Body Systems (LS.5.1.2)', title: 'Pump Up the Beat', phenom: PHEN,
        goal: 'Let’s explain how the respiratory and circulatory systems work together.',
        stds: [S2, ['SEP', 'Analyzing and interpreting data']],
        targets: ['I can use data to show that heart rate and breathing rate go up during exercise.', 'I can explain how the lungs and heart work together.'],
        vocab: [['heart rate', 'Heartbeats per minute.'], ['breathing rate', 'Breaths per minute.']],
        outline: [ex('Engage', 'Watch a sprinter’s video. How are the heart and lungs working together?'), ex('Explore', 'Pump Up the Beat lab: measure heart rate and breathing rate at rest and after exercise.'), ex('Explain', 'Make a graph. What pattern do you see?'), ex('Elaborate', 'Update your model with the heart and lungs.')],
        materials: ['Pump Up the Beat lab handout', 'Timer', 'Graph paper'],
        notes: [
          { t: 'p', html: '<p>The lungs and the heart are a <b>team</b>. The lungs put oxygen into the blood. The heart pumps that blood to the muscles. When muscles work hard, both systems speed up.</p>' },
          { t: 'example', title: 'Follow the oxygen', steps: ['The runner breathes in. Oxygen goes into the <b>lungs</b>.', 'Oxygen moves into the <b>blood</b>.', 'The <b>heart</b> pumps the blood to the leg <b>muscles</b>.', 'The muscles use oxygen and make carbon dioxide.', 'Blood carries the carbon dioxide back to the lungs. The runner breathes it out.'] },
          { t: 'fig', linegraph: { title: 'A Runner’s Heart Rate', xs: ['0 min', '1', '2', '3', '4', '5'], vals: [80, 120, 150, 160, 160, 120], step: 20, max: 180, yLabel: 'Beats per minute', xLabel: 'Minutes after starting to run (stopped at 4 min)' }, caption: 'Heart rate goes up while running, then comes down after the runner stops.' }
        ],
        practice: [
          { q: 'Use the graph in the notes. What was the heart rate at 0 minutes (before running)?', answer: 80, unit: 'beats per minute', why: 'The first point is at 80.' },
          { q: 'How much did the heart rate increase from 0 to 3 minutes?', answer: 160 - 80, unit: 'beats per minute', why: '160 − 80 = 80.' },
          { q: 'Why do heart rate and breathing rate both go up during exercise?', choices: ['Muscles need more oxygen, so the lungs take in more and the heart pumps it faster.', 'The body is trying to cool down the lungs.', 'They go up by accident.'], answer: 0, why: 'Both systems work together to deliver oxygen.' },
          { q: 'Which system brings oxygen <b>into</b> the body?', choices: ['Respiratory', 'Circulatory', 'Skeletal'], answer: 0, why: 'The lungs bring in oxygen; the circulatory system delivers it.' }
        ],
        lab: { type: 'link', title: 'Body Systems Lab: Race Day', intro: 'Open the Body Systems Lab and go to <b>Part 4: Race day</b>. Test the athlete at rest, walking and sprinting. Record heart rate and breathing rate.', href: BODYLAB, btn: 'Open the Body Systems Lab' },
        exit: [
          { q: 'Which pair of systems works together to get oxygen to the muscles?', choices: ['Respiratory and circulatory', 'Skeletal and digestive', 'Nervous and skeletal'], answer: 0, why: 'Lungs take in oxygen; heart and blood deliver it.' },
          { q: 'After running, what happens to breathing rate?', choices: ['It goes up', 'It goes down to zero', 'It stays the same'], answer: 0, why: 'You breathe faster to get more oxygen.' }
        ]
      },
      {
        n: 13, section: 'Part 2: The Body Systems (LS.5.1.2)', title: 'The Digestive System', phenom: PHEN,
        goal: 'Let’s explain the structures and functions of the digestive system.',
        stds: [S2, SEPm],
        targets: ['I can name the main structures: mouth, esophagus, stomach and intestines.', 'I can explain that the digestive system breaks food into nutrients, absorbs them, and gets rid of waste.'],
        vocab: [['digestion', 'Breaking food down into nutrients.'], ['esophagus', 'The tube from the mouth to the stomach.'], ['stomach', 'A stretchy bag that churns food with acid.'], ['small intestine', 'Where most nutrients go into the blood.'], ['large intestine', 'Where water is taken out and waste is formed.']],
        outline: [ex('Engage', 'Athletes eat before a big game. Where does that food go?'), ex('Explore', 'Model the stomach: a cracker, water and vinegar in a zip bag. Squeeze it! Model the intestines: push a ball through a knee-high.'), ex('Explain', 'Trace the path of food.')],
        materials: ['Zip bags, saltine crackers, water, vinegar (stomach model)', 'Knee-high stocking and a ball (intestine model)', 'Investigate Your Digestive System activity'],
        notes: [
          { t: 'example', title: 'The path of food', steps: ['<b>Mouth:</b> teeth chew and saliva starts breaking food down.', '<b>Esophagus:</b> muscles squeeze food down to the stomach.', '<b>Stomach:</b> churns food with acid into a mushy liquid.', '<b>Small intestine:</b> nutrients pass into the blood.', '<b>Large intestine:</b> water is absorbed; waste is formed and leaves the body.'] },
          { t: 'fill', html: 'Food goes from the mouth to the [[esophagus]] to the [[stomach]]. Nutrients go into the blood in the [[small intestine|small intestines]].' },
          { t: 'reveal', q: 'In our stomach model, what did the vinegar stand for? What did squeezing the bag stand for?', a: 'The vinegar stood for <b>stomach acid</b>. Squeezing stood for the stomach <b>muscles churning</b> the food.' }
        ],
        practice: [
          { q: 'Put the path of food in order.', choices: ['mouth → esophagus → stomach → small intestine → large intestine', 'mouth → stomach → esophagus → large intestine → small intestine', 'esophagus → mouth → stomach → small intestine → large intestine'], answer: 0, why: 'Mouth, esophagus, stomach, small intestine, large intestine.' },
          { q: 'Where do most nutrients go into the blood?', choices: ['Small intestine', 'Esophagus', 'Mouth'], answer: 0, why: 'The small intestine absorbs nutrients.' },
          { q: 'What is the function of the digestive system?', choices: ['Break down food, absorb nutrients, and remove waste', 'Pump blood', 'Send messages to the brain'], answer: 0, why: 'That is digestion.' },
          { q: 'Which digestive organ uses acid to break down food?', choices: ['Stomach', 'Esophagus', 'Large intestine'], answer: 0, why: 'The stomach churns food with acid.' }
        ],
        lab: { type: 'sort', title: 'Digestion Jobs', lead: 'Match each organ to its job.', intro: 'Sort each job under the organ that does it.', bins: ['Mouth', 'Esophagus', 'Stomach', 'Small intestine', 'Large intestine'], items: [['teeth chew food', 0], ['saliva makes food wet', 0], ['muscles squeeze food down a tube', 1], ['churns food with acid', 2], ['nutrients pass into the blood', 3], ['water is absorbed and waste forms', 4]], success: 'You traced food all the way through!' },
        exit: [
          { q: 'What connects the mouth to the stomach?', choices: ['Esophagus', 'Trachea', 'Intestine'], answer: 0, why: 'The esophagus carries food; the trachea carries air.' },
          { q: 'Why does an athlete need the digestive system?', choices: ['To get nutrients for energy from food', 'To get oxygen', 'To move bones'], answer: 0, why: 'Nutrients from food give the body energy.' },
          { q: 'Which organ is the last stop for waste?', choices: ['Large intestine', 'Stomach', 'Mouth'], answer: 0, why: 'The large intestine forms waste that leaves the body.' }
        ]
      },
      {
        n: 14, section: 'Part 2: The Body Systems (LS.5.1.2)', title: 'The Belly Dance', phenom: PHEN,
        goal: 'Let’s model how long the digestive system is and how it works with other systems.',
        stds: [S2, SEPm],
        targets: ['I can model the length of the digestive system.', 'I can explain how the digestive and circulatory systems work together.'],
        vocab: [['absorb', 'Take in.'], ['nutrients', 'Useful parts of food the body needs.']],
        outline: [ex('Engage', 'Follow an apple slice on its trip through the body (Apple handout).'), ex('Explore', 'Measure out yarn for each digestive organ with a measuring tape.'), ex('Explain', 'How can such a long tube fit inside your body?')],
        materials: ['Apple handout', 'Yarn and measuring tapes (one per group)', 'Science notebook'],
        notes: [
          { t: 'p', html: '<p>The digestive tract is one long tube from mouth to end. In an adult, the <b>small intestine</b> alone is about <b>6 meters</b> long! It is folded and coiled to fit inside your belly.</p>' },
          { t: 'fig', table: { caption: 'About how long? (adult, rounded)', head: ['Part', 'Length'], leftCol: true, rows: [['Esophagus', 'about 25 cm'], ['Stomach', 'about 25 cm'], ['Small intestine', 'about 6 m (600 cm)'], ['Large intestine', 'about 1.5 m (150 cm)']] } },
          { t: 'key', label: 'Systems working together', html: '<p style="margin:0">The <b>digestive system</b> breaks food into nutrients. The <b>circulatory system</b> carries those nutrients in the blood to every cell, including the athlete’s muscles.</p>' }
        ],
        practice: [
          { q: 'The small intestine is about 600 cm. The large intestine is about 150 cm. How much longer is the small intestine?', answer: 450, unit: 'cm', why: '600 − 150 = 450 cm.' },
          { q: 'How does such a long intestine fit in your body?', choices: ['It is folded and coiled up.', 'It is stretched straight.', 'It is outside the body.'], answer: 0, why: 'The intestines are coiled inside the belly.' },
          { q: 'Which system carries nutrients from the intestines to the muscles?', choices: ['Circulatory', 'Skeletal', 'Respiratory'], answer: 0, why: 'Blood carries nutrients.' }
        ],
        exit: [
          { q: 'Which part of the digestive system is the longest?', choices: ['Small intestine', 'Esophagus', 'Stomach'], answer: 0, why: 'About 6 meters in an adult.' },
          { q: 'Nutrients go from the small intestine into the…', choices: ['blood', 'lungs', 'bones'], answer: 0, why: 'Then the blood carries them to the cells.' }
        ]
      },
      {
        n: 15, section: 'Part 2: The Body Systems (LS.5.1.2)', title: 'You’ve Got Some Nerve!', phenom: PHEN,
        goal: 'Let’s explain the structures and functions of the nervous system.',
        stds: [S2, ['SEP', 'Planning and carrying out investigations']],
        targets: ['I can name the main structures: brain, spinal cord and nerves.', 'I can explain that the nervous system sends signals between the brain and the body.'],
        vocab: [['nervous system', 'The brain, spinal cord and nerves.'], ['brain', 'The control center of the body.'], ['spinal cord', 'A thick bundle of nerves inside the backbone.'], ['nerves', 'Fibers that carry messages.'], ['reaction time', 'How long it takes to respond to something.']],
        outline: [ex('Engage', 'How does a swimmer know to start at the sound of the beep?'), ex('Explore', 'Nervous System Stations: ruler drop (reaction time), paper clip touch test, and more.'), ex('Explain', 'Read The Nervous System text. Trace a message from the eyes to the brain to the muscles.'), ex('Evaluate', 'Stations exit ticket.')],
        materials: ['Nervous System Stations instruction sheet, data sheet and exit ticket', 'Meter sticks and rulers', 'Paper clips', 'The Nervous System text (CK-12)'],
        notes: [
          { t: 'p', html: '<p>The <b>nervous system</b> is the body’s message center. The <b>brain</b> is the boss. The <b>spinal cord</b> is the main highway. <b>Nerves</b> are the roads that reach every part of the body.</p>' },
          { t: 'example', title: 'A swimmer hears the start beep', steps: ['Ears sense the beep.', 'Nerves carry the message to the <b>brain</b>.', 'The brain decides: GO!', 'The message travels down the <b>spinal cord</b> and out through <b>nerves</b>.', 'Muscles contract and the swimmer dives — all in a fraction of a second!'] },
          { t: 'fill', html: 'The main parts of the nervous system are the [[brain]], the [[spinal cord]], and the [[nerves|nerve]]. Its job is to send [[messages|signals|message|signal]] between the brain and the body.' }
        ],
        practice: [
          { q: 'What is the control center of the body?', choices: ['Brain', 'Heart', 'Stomach'], answer: 0, why: 'The brain controls the body.' },
          { q: 'Which list has the main parts of the nervous system?', choices: ['Brain, spinal cord, nerves', 'Heart, blood, vessels', 'Nose, trachea, lungs'], answer: 0, why: 'The others are circulatory and respiratory.' },
          { q: 'Put a message in order: you see a ball coming and catch it.', choices: ['eyes → nerves → brain → spinal cord → nerves → hand muscles', 'hand → brain → eyes → spinal cord', 'brain → eyes → hand → nerves'], answer: 0, why: 'Senses → brain → spinal cord → nerves → muscles.' },
          { q: 'Which system works with the nervous system to make the body move?', choices: ['Muscular system', 'Digestive system', 'Respiratory system'], answer: 0, why: 'Nerves tell muscles when to contract.' }
        ],
        lab: { type: 'reaction', title: 'Reaction Time Lab', lead: 'How fast is your nervous system?', intro: 'Tap the box. When it turns <b>green</b>, tap as fast as you can! Do 5 trials. (Tapping too early doesn’t count.)' },
        exit: [
          { q: 'What protects the spinal cord?', choices: ['The backbone (spine)', 'The skull', 'The ribs'], answer: 0, why: 'The spinal cord runs inside the backbone.' },
          { q: 'What is the job of the nervous system?', choices: ['Send messages between the brain and the body', 'Pump blood', 'Absorb nutrients'], answer: 0, why: 'It is the body’s message system.' },
          { q: 'A message from the brain travels to the leg through the spinal cord and…', choices: ['nerves', 'veins', 'tendons'], answer: 0, why: 'Nerves carry messages.' }
        ]
      },
      {
        n: 16, section: 'Part 2: The Body Systems (LS.5.1.2)', title: 'Tying It All Together', phenom: PHEN,
        goal: 'Let’s explain how all the body systems work together so athletes can perform.',
        stds: [S1, S2, SEPm],
        targets: ['I can revise my model to show all six systems.', 'I can explain how the systems work together.'],
        vocab: [['revise', 'Change and improve using new evidence.']],
        outline: [ex('Revisit', 'Look back at your initial model and the DQB. Which questions can we answer now?'), ex('Revise', 'In groups, make a revised model with all six systems and how they help the athlete.'), ex('Gallery walk', 'Compare models. Add one new idea to yours.')],
        materials: ['How Do the Systems Work Together chart', 'Chart paper or whiteboards', 'Human Body Systems Review choice board'],
        notes: [
          { t: 'fig', table: { caption: 'How the systems help an athlete', head: ['System', 'Main structures', 'Job'], leftCol: true, rows: [['Skeletal', 'bones', 'support, protect, help move'], ['Muscular', 'muscles', 'movement'], ['Respiratory', 'nose, trachea, lungs', 'oxygen in, carbon dioxide out'], ['Circulatory', 'heart, blood, vessels', 'carry oxygen and nutrients; remove waste'], ['Digestive', 'mouth, esophagus, stomach, intestines', 'break down food into nutrients'], ['Nervous', 'brain, spinal cord, nerves', 'send messages']] } },
          { t: 'write', q: 'Explain how at least <b>three</b> systems work together when a swimmer races.', rows: 5, ph: 'When the swimmer hears the beep, the nervous system… The muscles… The lungs and heart…' }
        ],
        practice: [
          { type: 'sort', q: 'Match each structure to its system.', bins: ['Skeletal', 'Muscular', 'Respiratory', 'Circulatory', 'Digestive', 'Nervous'], items: [['skull', 0], ['biceps', 1], ['trachea', 2], ['heart', 3], ['stomach', 4], ['spinal cord', 5]], why: 'Each structure belongs to one system.' },
          { q: 'A gymnast lands a flip. Which systems are working? Choose the <b>best</b> answer.', choices: ['Nervous, muscular, skeletal, respiratory and circulatory — all together', 'Only the skeletal system', 'Only the digestive system'], answer: 0, why: 'Many systems work together at once.' },
          { q: 'Which system gets nutrients from food for the athlete’s energy?', choices: ['Digestive', 'Nervous', 'Skeletal'], answer: 0, why: 'The digestive system breaks food into nutrients.' }
        ],
        lab: { type: 'sketch', title: 'My Revised Model', lead: 'Show everything you learned.', intro: 'Draw the athlete again. This time, show all six systems and arrows for how they work together. Use the <b>Label</b> tool.', checklist: ['I showed all six body systems.', 'I labeled main structures (like heart, lungs, brain).', 'I used arrows to show how systems work together.', 'My model answers: What allows the athlete to perform?'] },
        exit: [
          { q: 'Which two systems work together to move a bone?', choices: ['Muscular and skeletal', 'Digestive and respiratory', 'Circulatory and digestive'], answer: 0, why: 'Muscles pull on bones.' },
          { q: 'Which system tells the muscles when to move?', choices: ['Nervous', 'Circulatory', 'Digestive'], answer: 0, why: 'The brain sends signals through nerves.' }
        ]
      },
      {
        n: 17, section: 'Wrap-Up', title: 'Review and Assessment', phenom: PHEN,
        goal: 'Let’s review the unit and show what we know.',
        stds: [S1, S2],
        targets: ['I can explain how the body is organized.', 'I can compare the six body systems and how they work together.'],
        vocab: [['review', 'Look back at what you learned.']],
        outline: [ex('Review', 'Human Body word wall and review choice board.'), ex('Practice', 'Practice and exit ticket on this page.'), ex('Assess', 'SchoolNet Unit 1 assessment: Fueling Athletes.')],
        materials: ['Human Body virtual word wall', 'Human Body Systems review choice board', { t: 'Unit 1 notebook', href: NB }],
        notes: [
          { t: 'key', label: 'Big ideas', html: '<ol style="margin:0"><li>Humans are <b>multicellular</b>: cell → tissue → organ → organ system → organism.</li><li>Each body system has <b>structures</b> and a <b>function</b>.</li><li>Systems <b>work together</b> so the body can live and move.</li></ol>' },
          { t: 'vocab', words: [['Skeletal', 'Bones: support, protect, help move.'], ['Muscular', 'Muscles: movement. Voluntary and involuntary.'], ['Respiratory', 'Nose, trachea, lungs: oxygen in, carbon dioxide out.'], ['Circulatory', 'Heart, blood, vessels: deliver oxygen and nutrients, remove waste.'], ['Digestive', 'Mouth, esophagus, stomach, intestines: food → nutrients.'], ['Nervous', 'Brain, spinal cord, nerves: send messages.']] }
        ],
        practice: [
          { q: 'Which is the correct order from smallest to largest?', choices: ['cell, tissue, organ, organ system, organism', 'organism, organ, cell, tissue, system'], answer: 0, why: 'Small parts build bigger parts.' },
          { q: 'Which system brings oxygen into the body?', choices: ['Respiratory', 'Digestive', 'Skeletal'], answer: 0, why: 'The lungs bring in oxygen.' },
          { q: 'Which system breaks food into nutrients?', choices: ['Digestive', 'Nervous', 'Muscular'], answer: 0, why: 'Digestion = breaking down food.' },
          { q: 'Which system protects the brain and holds the body up?', choices: ['Skeletal', 'Circulatory', 'Respiratory'], answer: 0, why: 'The skull protects the brain; bones give support.' },
          { q: 'You count 25 heartbeats in 15 seconds. What is the heart rate per minute?', answer: 100, unit: 'beats per minute', why: '25 × 4 = 100.' }
        ],
        lab: { type: 'link', title: 'Body Systems Lab (all parts)', intro: 'Review with all four parts of the Body Systems Lab.', href: BODYLAB, btn: 'Open the Body Systems Lab' },
        exit: [
          { q: 'Muscle tissue is made of…', choices: ['muscle cells', 'organs', 'organ systems'], answer: 0, why: 'Tissues are made of cells.' },
          { q: 'Which pair works together to deliver oxygen?', choices: ['Respiratory and circulatory', 'Skeletal and digestive'], answer: 0, why: 'Lungs + heart and blood.' },
          { q: 'Which is an <b>involuntary</b> muscle?', choices: ['Heart', 'Leg muscle', 'Arm muscle'], answer: 0, why: 'The heart beats on its own.' },
          { q: 'What carries messages from the brain to the muscles?', choices: ['Nerves', 'Blood vessels', 'Bones'], answer: 0, why: 'Nerves carry signals.' },
          { type: 'sort', q: 'Sort each organ into its system.', bins: ['Digestive', 'Respiratory', 'Circulatory'], items: [['stomach', 0], ['small intestine', 0], ['lungs', 1], ['trachea', 1], ['heart', 2], ['blood vessels', 2]], why: 'Each organ belongs to one system.' }
        ]
      }
    ]
  });
})();
