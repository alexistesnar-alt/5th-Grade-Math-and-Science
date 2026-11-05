/* Science · Unit 0: Building a Community of Scientists — 4 tasks (about 1 week).
   Unit 0 builds the science practices we use all year. It has no content standard of its own,
   so each task lists the NC Science and Engineering Practice (SEP) it builds.
   To change words: edit the text inside the quotes. Keep the commas and brackets. */
(function () {
  var SEP = {
    q: ['SEP', 'Asking questions and defining problems'],
    inv: ['SEP', 'Planning and carrying out investigations'],
    data: ['SEP', 'Analyzing and interpreting data'],
    model: ['SEP', 'Developing and using models'],
    arg: ['SEP', 'Engaging in argument from evidence'],
    comm: ['SEP', 'Obtaining, evaluating and communicating information']
  };

  LessonKit.unit({
    id: 'sci-u0', subject: 'science', short: 'Unit 0', title: 'Building a Community of Scientists', home: '../index.html', unitHref: '../unit0.html', word: 'Task',
    lessons: [
      /* =============================== TASK 1 =============================== */
      {
        n: 1, title: 'Seeing Ourselves as Scientists',
        goal: 'Let’s understand that anyone can be a scientist, and that science happens in many places and in many ways.',
        stds: [SEP.q, SEP.comm],
        targets: ['I can explain what science is.', 'I can describe what scientists do and where they work.', 'I can see myself as a scientist.'],
        vocab: [['science', 'Asking questions about the world and finding answers with evidence.'], ['scientist', 'A person who asks questions and tests ideas.'], ['observe', 'Use your senses to notice details.'], ['evidence', 'Facts or data that support an idea.']],
        outline: [
          ['Think', 5, 'What is science? Think on your own, then talk with your group.'],
          ['Draw', 15, '<b>Draw a scientist</b> doing science. Show what they look like, where they work, and what makes them a good scientist. Add labels.'],
          ['Gallery walk', 10, '<b>Compare and Connect:</b> walk around and look at everyone’s drawings. What do you notice? What do you wonder?'],
          ['Think–Pair–Share', 10, 'What do many of our drawings have in common? What is missing? Did anything surprise you?'],
          ['Extend', 5, 'Meet real scientists from the <i>I Am a Scientist</i> spotlights.']
        ],
        materials: ['Science notebook (first page: “What Is a Scientist?”)', 'Pencils, crayons, markers or colored pencils', 'Unit 0 slideshow', { t: 'I Am a Scientist', href: 'https://www.iamascientist.info/', note: 'Real scientists and what they do' }],
        notes: [
          { t: 'p', html: '<p><b>Science</b> is a way of figuring out how the world works. Scientists <b>ask questions</b>, <b>observe</b>, <b>test ideas</b>, and use <b>evidence</b> to explain what they find.</p>' },
          { t: 'vocab', words: [
            ['Science', 'A way of learning about the natural world by asking questions and finding answers with evidence.'],
            ['Scientist', 'Anyone who asks questions, investigates, and shares what they learn.', 'A kid testing which paper airplane flies farthest'],
            ['Observe', 'Use your senses (see, hear, smell, touch) to notice details.', 'The leaf has jagged edges.'],
            ['Evidence', 'Facts or data you collect that support an idea.', 'We counted 30 drops each time.']
          ] },
          { t: 'key', label: 'Scientists can…', html: '<ul style="margin:0"><li>look like <b>anyone</b> — any age, any background, girls and boys</li><li>work <b>anywhere</b>: labs, oceans, forests, farms, hospitals, kitchens, space, and schools</li><li>work in <b>teams</b> and share ideas</li><li>make mistakes and <b>learn from them</b></li></ul>' },
          { t: 'fill', html: 'Science is a way to learn about the world by asking [[questions|question]] and finding answers with [[evidence]]. A scientist can be [[anyone|any person|everyone]].' },
          { t: 'write', q: '<b>Notice and Wonder:</b> After the gallery walk, what did you notice about the scientists in our drawings?', ph: 'I noticed… I wonder…' },
          { t: 'write', q: 'How are <b>you</b> already a scientist? Name one question you have about the world.', ph: 'I am a scientist when I… One question I have is…' }
        ],
        practice: [
          { type: 'sort', q: 'Is it <b>true</b> about scientists, or is it a <b>myth</b> (not true)?', bins: ['True', 'Myth'], items: [
            ['Scientists can work outside, in forests and oceans.', 0], ['All scientists wear lab coats and goggles.', 1], ['Kids can do science.', 0],
            ['Scientists always work alone.', 1], ['Scientists share ideas even when they are not sure.', 0], ['Scientists never make mistakes.', 1]
          ], hint: 'Think about the real scientists in the spotlights. Do they all look and work the same way?', why: 'Scientists are all kinds of people. They work in many places, often in teams, and they learn from mistakes.' },
          { q: 'Which person is doing science?', choices: ['A girl counts how many birds visit a feeder each morning and records it.', 'A boy colors a picture of a bird.', 'A girl reads a story about a bird for fun.'], answer: 0, hint: 'Science means asking a question and collecting evidence.', why: 'Counting and recording birds is collecting data (evidence) to answer a question.' },
          { q: 'What is <b>evidence</b>?', choices: ['Facts or data that support an idea', 'A guess with no reason', 'A drawing of a scientist'], answer: 0, why: 'Evidence is information you collect, like measurements and observations.' },
          { q: 'Where can science happen? Choose <b>all</b> that are true.', type: 'multi', choices: ['In a lab', 'In a kitchen', 'In a forest', 'In our classroom'], answer: [0, 1, 2, 3], hint: 'Science can happen anywhere people ask questions and look for evidence.', why: 'All of them! Science happens anywhere.' }
        ],
        lab: {
          type: 'sketch', title: 'Draw a Scientist', lead: 'Your drawing is the first page of your science notebook.',
          intro: 'Draw a scientist doing science. Show: <b>what they look like</b>, <b>where they are working</b>, and <b>what makes them a good scientist</b>. Use the Label tool to add labels.',
          checklist: ['I drew a scientist and where they work.', 'I added at least 3 labels.', 'I showed something the scientist is doing (observing, measuring, testing…).', 'I wrote one thing that makes a good scientist.']
        },
        exit: [
          { q: 'What is science?', choices: ['A way to learn about the world by asking questions and using evidence', 'Only mixing chemicals in a lab', 'Memorizing facts from a book'], answer: 0, why: 'Science is asking questions and finding answers with evidence.' },
          { q: 'Who can be a scientist?', choices: ['Anyone', 'Only adults', 'Only people in lab coats'], answer: 0, why: 'Anyone who asks questions and investigates is doing science, including you.' },
          { q: 'A farmer tests two kinds of soil to see which grows taller corn. Is the farmer doing science?', choices: ['Yes — the farmer is testing an idea and collecting evidence.', 'No — science only happens in a lab.'], answer: 0, why: 'Testing an idea and measuring results is science, no matter where it happens.' }
        ]
      },

      /* =============================== TASK 2 =============================== */
      {
        n: 2, title: 'How We Figure Things Out in Science',
        goal: 'Let’s build classroom agreements that help us learn and work together like scientists.',
        stds: [SEP.arg, SEP.comm],
        targets: ['I can name our science class agreements.', 'I can give an example of what each agreement looks like and sounds like.', 'I can take part in a Scientists Circle.'],
        vocab: [['agreement', 'A promise our class makes about how we work together.'], ['Scientists Circle', 'Our class sits in a circle so everyone can see and hear each other.'], ['idea', 'What you think, even if you are not sure yet.']],
        outline: [
          ['Discuss', 10, 'Read four science agreements. Talk with your group: what does each one look like in our class?'],
          ['Sticky notes', 10, 'Write one example on each sticky note. One idea per note.'],
          ['Scientists Circle', 15, 'Share your ideas in the circle. If the class gives a thumbs up, place your note on the chart.'],
          ['Wrap-up', 5, 'Is anything missing? Think about new agreements to add after our next investigation.']
        ],
        materials: ['Chart paper: “Science Agreements”', 'Sticky notes', 'Unit 0 slideshow', { t: 'Who Talks First? cards', note: 'Pick who shares first in your group' }],
        notes: [
          { t: 'p', html: '<p>Scientists work in <b>communities</b>. They listen to each other, share ideas, and change their minds when they find new evidence. Our class will work the same way. These are our four science agreements:</p>' },
          { t: 'key', label: 'Our Science Agreements', html: '<ol style="margin:0"><li><b>We can do science in many different ways.</b></li><li><b>We share ideas even when we are not sure.</b></li><li><b>We look, listen, and respond to each other’s ideas.</b></li><li><b>We let our ideas change and grow.</b></li></ol>' },
          { t: 'fill', html: 'In science, we share ideas even when we are not [[sure]]. We look, [[listen]], and respond to each other. We let our ideas [[change]] and grow.' },
          { t: 'h', html: 'Sentence starters for the Scientists Circle' },
          { t: 'p', html: '<ul><li>“I agree with ___ because…”</li><li>“I respectfully disagree because…”</li><li>“I want to add on to ___’s idea…”</li><li>“I used to think ___, but now I think…”</li><li>“Can you say more about…?”</li></ul>' },
          { t: 'write', q: 'Pick one agreement. Write what it <b>looks like</b> and <b>sounds like</b> in our class.', ph: 'Agreement: … It looks like … It sounds like …' }
        ],
        practice: [
          { q: 'Maya isn’t sure her idea is right, but she shares it anyway. Which agreement is she following?', choices: ['We share ideas even when we are not sure.', 'We let our ideas change and grow.', 'We can do science in many different ways.'], answer: 0, why: 'Sharing an idea before you are sure helps the whole class think.' },
          { q: 'After seeing new data, Leo says, “I used to think heavier balls fall faster, but now I think they fall the same.” Which agreement is he following?', choices: ['We let our ideas change and grow.', 'We look, listen, and respond to each other’s ideas.', 'We share ideas even when we are not sure.'], answer: 0, why: 'Leo changed his idea because of new evidence. That is what scientists do.' },
          { q: 'Which is the <b>best</b> way to respond to a classmate’s idea?', choices: ['“I want to add on to your idea…”', '“That’s wrong.”', 'Talk to your friend while they are sharing.'], answer: 0, hint: 'Which one shows you listened and are building on the idea?', why: 'Adding on shows respect and helps ideas grow.' },
          { q: 'Why do we sit in a <b>Scientists Circle</b>?', choices: ['So everyone can see and hear each other', 'So the teacher can grade us', 'So we can work alone'], answer: 0, why: 'In a circle, every voice can be seen and heard.' }
        ],
        lab: {
          type: 'sort', title: 'Agreement Sort', lead: 'What does each agreement look like?',
          intro: 'Each card shows something a student might do. Sort it under the agreement it matches.',
          bins: ['Share ideas even when not sure', 'Look, listen, and respond', 'Let ideas change and grow', 'Do science in many ways'],
          items: [
            ['Raises a hand to share a guess', 0], ['Says, “I think… but I’m not sure.”', 0],
            ['Looks at the speaker and nods', 1], ['Says, “Can you say more about that?”', 1],
            ['Says, “I used to think…, but now I think…”', 2], ['Adds new evidence to a model', 2],
            ['Draws a model to show an idea', 3], ['Tests an idea with an experiment', 3]
          ],
          success: 'These are the moves of a strong science community.'
        },
        exit: [
          { q: 'Which is one of our science agreements?', choices: ['We let our ideas change and grow.', 'We only share when we are sure.', 'We keep our ideas to ourselves.'], answer: 0, why: 'Our ideas can change when we get new evidence.' },
          { q: 'A classmate shares an idea you disagree with. What should you say?', choices: ['“I respectfully disagree because…”', '“No, you’re wrong.”', 'Say nothing and roll your eyes.'], answer: 0, why: 'Disagree with the idea, not the person, and give a reason.' },
          { q: 'Why is it OK to share an idea when you are not sure?', choices: ['Because unsure ideas help the class think and learn together', 'Because the teacher will tell us the answer anyway', 'It is not OK'], answer: 0, why: 'Every idea gives the group something to test and talk about.' }
        ]
      },

      /* =============================== TASK 3 =============================== */
      {
        n: 3, title: 'Drops on a Penny',
        goal: 'Let’s practice the skills of a scientist: predict, test fairly, collect data, and draw a conclusion.',
        stds: [SEP.inv, SEP.data, ['NC.5.MD.2', 'Math connection: make and read a bar graph.']],
        targets: ['I can make a prediction (hypothesis).', 'I can plan a fair test.', 'I can record data in a table and find an average.', 'I can use data to draw a conclusion.'],
        vocab: [['hypothesis', 'A prediction you can test: “If…, then…”'], ['fair test', 'Only one thing changes. Everything else stays the same.'], ['variable', 'Something that can change in an investigation.'], ['trial', 'One try of the test.'], ['average', 'The “fair share”: add all trials, then divide by how many.'], ['conclusion', 'What the data tells you.']],
        outline: [
          ['Question', 5, 'How many drops of water can a penny hold? Will soapy water change that?'],
          ['Predict', 5, 'Write a hypothesis: “If I drop ___ water on a penny, then it will hold ___ drops.”'],
          ['Plan', 10, 'What will we change? What will we keep the same? How will we record our data?'],
          ['Investigate', 20, 'Do 5 trials with plain water and 5 with soapy water. Record every trial.'],
          ['Share', 10, 'Make a representation of your results. Compare and Connect with other groups.']
        ],
        materials: ['Penny (use the heads side)', 'Water dropper', 'Cup of plain water and cup of soapy water', 'Paper towels', 'Student handout: Water Drops on a Penny Challenge', 'Large whiteboard for sharing results'],
        notes: [
          { t: 'p', html: '<p>Scientists follow steps to answer a question. Today we will answer: <b>Will plain water or soapy water hold more drops on a penny?</b></p>' },
          { t: 'example', title: 'How scientists investigate', steps: [
            '<b>Ask a question.</b> Will plain or soapy water hold more drops on a penny?',
            '<b>Make a hypothesis.</b> “If I drop <u>plain</u> water on a penny, then it will hold <u>25</u> drops.”',
            '<b>Plan a fair test.</b> Change only the type of water. Keep the penny, the dropper and the height (3 cm) the same.',
            '<b>Collect data.</b> Count drops until the water spills. Do 5 trials. Write each number in a data table.',
            '<b>Analyze.</b> Find the average. Make a bar graph.',
            '<b>Conclude.</b> Was your hypothesis right? What does the evidence show?'
          ] },
          { t: 'vocab', words: [
            ['Hypothesis', 'A prediction you can test. It often uses <b>If… then…</b>', 'If I use soapy water, then the penny will hold fewer drops.'],
            ['Fair test', 'Only <b>one</b> thing changes. Everything else stays the same.'],
            ['Trial', 'One try of an experiment. More trials = more trustworthy data.'],
            ['Average', 'Add up all the trials, then divide by the number of trials.']
          ] },
          { t: 'key', label: 'Our fair test', html: '<div class="tw"><table class="dt" style="margin:0"><tr><th class="l">We change</th><td class="l">the type of water (plain or soapy)</td></tr><tr><th class="l">We keep the same</th><td class="l">the penny, the dropper, the height (3 cm), heads side up</td></tr><tr><th class="l">We measure</th><td class="l">the number of drops before it spills</td></tr></table></div>' },
          { t: 'fill', html: 'In a fair test, we change only [[one|1]] thing. We repeat the test in several [[trials|trial]] so our data is more trustworthy. To find the average, we add the trials and [[divide]] by the number of trials.' },
          { t: 'write', q: 'Write your hypothesis.', ph: 'If I drop ___ water on a penny, then it will hold ___ drops before it overflows.' }
        ],
        practice: [
          { q: 'In the penny investigation, what is the <b>one thing we change</b>?', choices: ['The type of water', 'The size of the penny', 'The height of the dropper'], answer: 0, why: 'We only change the type of water. That makes it a fair test.' },
          { q: 'Why do we hold the dropper at the <b>same height</b> every time?', choices: ['To keep the test fair', 'Because it looks nicer', 'To use less water'], answer: 0, hint: 'What would happen if one drop fell from very high and another from very low?', why: 'If we changed the height too, we wouldn’t know if the water type or the height made the difference.' },
          { q: 'Why do scientists do <b>5 trials</b> instead of 1?', choices: ['One try could be a fluke. More trials give more trustworthy data.', 'To make the experiment take longer', 'Because 5 is a lucky number'], answer: 0, why: 'Repeating trials helps us trust our results.' },
          { q: 'Five trials of plain water held 30, 34, 32, 36 and 33 drops. What is the <b>total</b>?', answer: 30 + 34 + 32 + 36 + 33, hint: 'Add all five numbers.', why: '30 + 34 + 32 + 36 + 33 = 165.' },
          { q: 'The total was 165 drops in 5 trials. What is the average? (165 ÷ 5)', answer: 165 / 5, unit: 'drops', hint: 'Divide the total by 5. Think: 5 × ? = 165.', why: '165 ÷ 5 = 33. The average is 33 drops.' },
          { q: 'Which is a <b>hypothesis</b>?', choices: ['If I add soap to the water, then the penny will hold fewer drops.', 'The penny is brown.', 'I like plain water better.'], answer: 0, why: 'A hypothesis is a prediction you can test, often with “If… then…”.' }
        ],
        lab: {
          type: 'penny', title: 'Virtual Penny Lab', lead: 'Do the investigation here, or use it to check your class data.',
          intro: 'Choose plain or soapy water. Tap <b>Add a drop</b> one drop at a time and count. When it spills, the number is recorded. Do 5 trials of each kind of water.'
        },
        exit: [
          { q: 'Sam tests whether paper towel brand A or B soaks up more water. Which test is <b>fair</b>?', choices: ['Use the same amount of water and the same size towel for both brands.', 'Use a big towel for brand A and a small towel for brand B.', 'Use warm water for A and cold water for B.'], answer: 0, why: 'Only the brand changes. Everything else stays the same.' },
          { q: 'Soapy water held 15, 17, 14, 16 and 18 drops. What is the total?', answer: 15 + 17 + 14 + 16 + 18, why: '15 + 17 + 14 + 16 + 18 = 80.' },
          { q: 'Use the bar graph. What conclusion does the data support?', fig: { bar: { title: 'Average Drops on a Penny', cats: ['Plain', 'Soapy'], vals: [33, 16], step: 5, yLabel: 'Drops' } }, choices: ['Plain water held more drops than soapy water.', 'Soapy water held more drops than plain water.', 'Both held the same number of drops.'], answer: 0, why: 'The plain water bar (33) is taller than the soapy bar (16).' },
          { q: 'What is a <b>trial</b>?', choices: ['One try of the experiment', 'The question you ask', 'The tool you use'], answer: 0, why: 'Each time you run the test is one trial.' }
        ]
      },

      /* =============================== TASK 4 =============================== */
      {
        n: 4, title: 'Scientific Sketching',
        goal: 'Let’s learn how to show what we observe with a scientific sketch.',
        stds: [SEP.model, SEP.comm],
        targets: ['I can make a scientific sketch that shows what I really see.', 'I can add a title, labels, and size to my sketch.', 'I can tell the difference between an observation and an opinion.'],
        vocab: [['scientific sketch', 'A careful drawing that shows exactly what you observe.'], ['label', 'A word with a line that points to a part.'], ['observation', 'Something you notice with your senses.'], ['opinion', 'What you feel or think about something.']],
        outline: [
          ['Warm-up', 5, 'How is a <b>scientific sketch</b> different from an art drawing?'],
          ['Model', 10, 'Watch how a scientist sketches a leaf: look closely, draw only what you see, then label.'],
          ['Sketch', 20, 'Choose one object (a leaf). Make a scientific sketch in your notebook with a title, date, labels and size.'],
          ['Share', 10, 'Trade notebooks with a partner. Use the checklist to give one glow and one grow.']
        ],
        materials: ['Science notebook', 'Pencil and colored pencils', 'One object to sketch per student (for example, a leaf)', 'Hand lens (optional)', 'Ruler'],
        notes: [
          { t: 'p', html: '<p>Scientists use sketches to <b>record what they observe</b>. A scientific sketch is not about being “pretty.” It is about being <b>accurate</b>: drawing what is really there, so someone else can learn from it.</p>' },
          { t: 'key', label: 'A good scientific sketch has', html: '<ul style="margin:0"><li>a <b>title</b> and the <b>date</b></li><li>a <b>large</b>, clear drawing that fills the space</li><li><b>labels</b> with straight lines pointing to the parts</li><li><b>real colors</b> (only if they help)</li><li>the <b>size</b> (measure it!)</li><li><b>observations</b> written as notes — not opinions</li></ul>' },
          { t: 'vocab', words: [
            ['Observation', 'Something you notice using your senses.', 'The leaf is 8 cm long and has jagged edges.'],
            ['Opinion', 'What you feel or believe. It can’t be measured.', 'The leaf is pretty.'],
            ['Label', 'A word with a straight line pointing to a part of the sketch.', 'vein → ']
          ] },
          { t: 'fill', html: 'A scientific sketch shows what you really [[see|observe]]. It has a title, the date, and [[labels|label]]. “The leaf is green” is an [[observation]]. “The leaf is beautiful” is an [[opinion]].' },
          { t: 'reveal', q: 'Why do scientists write the <b>size</b> on a sketch?', a: 'A drawing can be any size on paper. Writing the real size (like “8 cm long”) tells others how big the object really is.' }
        ],
        practice: [
          { type: 'sort', q: 'Sort each note: is it an <b>observation</b> or an <b>opinion</b>?', bins: ['Observation', 'Opinion'], items: [
            ['The leaf is 8 cm long.', 0], ['The leaf has jagged edges.', 0], ['There is a brown spot near the top.', 0],
            ['This is the prettiest leaf.', 1], ['Leaves are boring.', 1], ['I love the color green.', 1]
          ], hint: 'Can you measure it or see it? That’s an observation. Is it a feeling? That’s an opinion.', why: 'Observations come from your senses. Opinions are feelings.' },
          { q: 'Which belongs on a scientific sketch?', choices: ['Labels with lines pointing to parts', 'A cartoon face on the leaf', 'Glitter and stickers'], answer: 0, why: 'Labels help others understand what you observed.' },
          { q: 'How should your sketch be drawn?', choices: ['Large and clear, showing only what you see', 'Tiny in the corner of the page', 'With extra parts you imagine'], answer: 0, why: 'A big, accurate drawing shows the details.' },
          { q: 'Ana measures a leaf. Where should she write “8 cm”?', choices: ['On the sketch, next to the leaf', 'Nowhere — size doesn’t matter', 'On a different page'], answer: 0, why: 'The size goes on the sketch so others know how big it really is.' }
        ],
        lab: {
          type: 'sketch', specimen: 'leaf', title: 'Sketch a Leaf', lead: 'Observe closely, then sketch.',
          intro: 'Look at the leaf. Use the <b>hand lens</b> to see details. Sketch it big. Then use the <b>Label</b> tool to label the stem, veins, and edge. Add a title and the size (8 cm).',
          checklist: ['My sketch has a title.', 'My drawing is big and fills the space.', 'I labeled the stem, the veins and the edge.', 'I wrote the size (8 cm).', 'I wrote one observation, not an opinion.']
        },
        exit: [
          { q: 'Which is an <b>observation</b>?', choices: ['The rock has white stripes.', 'The rock is the coolest rock ever.', 'I think rocks are fun.'], answer: 0, why: 'You can see white stripes. That is an observation.' },
          { q: 'What makes a sketch <b>scientific</b>?', choices: ['It shows exactly what you observe, with labels', 'It uses lots of bright colors', 'It looks like a cartoon'], answer: 0, why: 'Accuracy and labels make it scientific.' },
          { type: 'multi', q: 'Choose <b>all</b> the parts a scientific sketch should have.', choices: ['A title', 'Labels', 'The size of the object', 'A made-up background'], answer: [0, 1, 2], why: 'Title, labels and size help others learn from your sketch. A made-up background does not.' }
        ]
      }
    ]
  });
})();
